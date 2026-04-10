import React, { useState, useEffect, useRef } from 'react';
import { searchSubjects, getAllSubjects } from '../utils/subjectsData';
import './SubjectSearch.css';

const SubjectSearch = ({ 
  onSubjectSelect, 
  placeholder = "Search subjects...", 
  branch = null, 
  year = null, 
  semester = null,
  showAllSubjects = false,
  className = "",
  disabled = false
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          inputRef.current && !inputRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const results = searchSubjects(query, branch, year, semester);
    setSuggestions(results.slice(0, 10)); // Limit to 10 suggestions
    setSelectedIndex(-1);
  }, [query, branch, year, semester]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(true);
  };

  const handleKeyDown = (e) => {
    if (!isOpen || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          selectSubject(suggestions[selectedIndex]);
        } else if (suggestions.length > 0) {
          selectSubject(suggestions[0]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const selectSubject = (subject) => {
    setQuery('');
    setIsOpen(false);
    setSelectedIndex(-1);
    if (onSubjectSelect) {
      onSubjectSelect(subject);
    }
  };

  const handleFocus = () => {
    if (!disabled) {
      setIsOpen(true);
      // Show all subjects when focused and no query
      if (!query.trim()) {
        const allSubjects = showAllSubjects ? getAllSubjects() : searchSubjects('', branch, year, semester);
        setSuggestions(allSubjects.slice(0, 10));
      }
    }
  };

  const handleBlur = (e) => {
    // Don't close immediately to allow clicking on suggestions
    setTimeout(() => {
      if (!dropdownRef.current?.contains(e.relatedTarget)) {
        setIsOpen(false);
      }
    }, 150);
  };

  const clearInput = () => {
    setQuery('');
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  return (
    <div className={`subject-search-container ${className}`}>
      <div className="search-input-wrapper">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="subject-search-input"
          disabled={disabled}
          autoComplete="off"
        />
        {query && (
          <button 
            type="button" 
            onClick={clearInput}
            className="clear-button"
            aria-label="Clear search"
          >
            ×
          </button>
        )}
        <div className="search-icon">?</div>
      </div>

      {isOpen && suggestions.length > 0 && (
        <div ref={dropdownRef} className="subject-suggestions-dropdown">
          <div className="suggestions-header">
            <span className="suggestions-title">
              {query.trim() ? `Results for "${query}"` : 'All Subjects'}
            </span>
            <span className="suggestions-count">
              {suggestions.length} subjects found
            </span>
          </div>
          <ul className="suggestions-list">
            {suggestions.map((subject, index) => (
              <li
                key={subject}
                className={`suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
                onClick={() => selectSubject(subject)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <span className="suggestion-icon">?</span>
                <span className="suggestion-text">{subject}</span>
                {query && subject.toLowerCase().includes(query.toLowerCase()) && (
                  <span className="match-indicator">Match</span>
                )}
              </li>
            ))}
          </ul>
          {suggestions.length === 0 && (
            <div className="no-suggestions">
              <span className="no-results-icon">?</span>
              <span className="no-results-text">No subjects found</span>
              <span className="no-results-hint">Try different keywords</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SubjectSearch;
