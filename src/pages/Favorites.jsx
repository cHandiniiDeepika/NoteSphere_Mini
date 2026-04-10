import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteCard from '../components/NoteCard';
import './Favorites.css';

const Favorites = () => {
  const navigate = useNavigate();

  // Mock favorites data - in a real app, this would come from user preferences or API
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      title: 'Physics Revision Notes',
      description: 'Complete physics revision notes for semester 2 covering mechanics, thermodynamics, and electromagnetism',
      author: 'Dr. Sarah Johnson',
      branch: 'ECE',
      year: '2nd Year',
      semester: '3rd Semester',
      subject: 'Physics',
      thumbnail: 'https://picsum.photos/seed/physics/200/280',
      fileUrl: 'https://example.com/physics-notes.pdf',
      previewUrl: 'https://example.com/physics-preview.pdf',
      fileSize: '2.4 MB',
      pages: 45,
      rating: 4.8,
      downloads: 234,
      views: 567,
      likes: 89,
      tags: [
        { id: '1', name: 'Physics', color: '#ef4444' },
        { id: '2', name: 'Mechanics', color: '#f59e0b' }
      ],
      isLiked: false,
      isFavorited: true,
      favoritedDate: '1 day ago'
    },
    {
      id: 2,
      title: 'Chemistry Guide',
      description: 'Comprehensive chemistry guide with formulas, reactions, and periodic table explanations',
      author: 'Prof. Michael Chen',
      branch: 'CSE',
      year: '3rd Year',
      semester: '5th Semester',
      subject: 'Chemistry',
      thumbnail: 'https://picsum.photos/seed/chemistry/200/280',
      fileUrl: 'https://example.com/chemistry-guide.pdf',
      previewUrl: 'https://example.com/chemistry-preview.pdf',
      fileSize: '3.1 MB',
      pages: 62,
      rating: 4.9,
      downloads: 189,
      views: 423,
      likes: 76,
      tags: [
        { id: '3', name: 'Chemistry', color: '#10b981' },
        { id: '4', name: 'Organic', color: '#06b6d4' }
      ],
      isLiked: true,
      isFavorited: true,
      favoritedDate: '2 days ago'
    },
    {
      id: 3,
      title: 'Mathematics Formula Sheet',
      description: 'Essential mathematics formulas for calculus, linear algebra, and differential equations',
      author: 'Dr. Emily Davis',
      branch: 'EEE',
      year: '2nd Year',
      semester: '4th Semester',
      subject: 'Mathematics',
      thumbnail: 'https://picsum.photos/seed/math/200/280',
      fileUrl: 'https://example.com/math-formulas.pdf',
      previewUrl: 'https://example.com/math-preview.pdf',
      fileSize: '1.8 MB',
      pages: 28,
      rating: 4.7,
      downloads: 312,
      views: 789,
      likes: 102,
      tags: [
        { id: '5', name: 'Mathematics', color: '#3b82f6' },
        { id: '6', name: 'Formulas', color: '#8b5cf6' }
      ],
      isLiked: true,
      isFavorited: true,
      favoritedDate: '3 days ago'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const categories = [
    { id: 'all', name: 'All Favorites', count: favorites.length },
    { id: 'physics', name: 'Physics', count: favorites.filter(n => n.tags.some(t => t.name === 'Physics')).length },
    { id: 'math', name: 'Mathematics', count: favorites.filter(n => n.tags.some(t => t.name === 'Mathematics')).length },
    { id: 'chemistry', name: 'Chemistry', count: favorites.filter(n => n.tags.some(t => t.name === 'Chemistry')).length },
    { id: 'programming', name: 'Programming', count: favorites.filter(n => n.tags.some(t => t.name === 'Programming')).length },
    { id: 'biology', name: 'Biology', count: favorites.filter(n => n.tags.some(t => t.name === 'Biology')).length }
  ];

  const filteredFavorites = favorites.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' ||
      note.tags.some(tag => tag.name.toLowerCase() === selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  const sortedFavorites = [...filteredFavorites].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.favoritedDate) - new Date(a.favoritedDate);
      case 'title':
        return a.title.localeCompare(b.title);
      case 'author':
        return a.author.localeCompare(b.author);
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  const handleViewNote = (noteId) => {
    console.log('Viewing favorite note:', noteId);
  };

  const handleNoteAction = (noteId, action, value) => {
    console.log(`Note ${noteId} ${action}:`, value);

    switch (action) {
      case 'like':
        // Update like status
        break;
      case 'favorite':
        // Remove from favorites
        setFavorites(prev => prev.filter(fav => fav.id !== noteId));
        break;
      case 'download':
        // Track download
        console.log(`Downloaded note: ${noteId}`);
        break;
      case 'view':
        // Track preview view
        console.log(`Previewed note: ${noteId}`);
        break;
      default:
        console.log(`Unknown action: ${action}`);
    }
  };

  const handleDownload = (noteId) => {
    handleNoteAction(noteId, 'download', null);
  };

  const handleRemoveFavorite = (noteId) => {
    setFavorites(prev => prev.filter(fav => fav.id !== noteId));
  };

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <h1>My Favorites</h1>
        <p>Notes you've saved for quick access</p>
      </div>

      <div className="favorites-controls">
        <div className="search-filter-section">
          <div className="search-bar">
            <span className="search-icon"></span>
            <input
              type="text"
              placeholder="Search favorites..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <span className="search-icon"></span>
          </div>

          <div className="filter-dropdowns">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name} ({category.count})
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="recent">Most Recent</option>
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        <div className="view-controls">
          <button
            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            <span>Grid</span>
          </button>
          <button
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            <span>List</span>
          </button>
        </div>
      </div>

      <div className="favorites-stats">
        <div className="stat-item">
          <span className="stat-number">{favorites.length}</span>
          <span className="stat-label">Total Favorites</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{filteredFavorites.length}</span>
          <span className="stat-label">Filtered</span>
        </div>
      </div>

      {sortedFavorites.length > 0 ? (
        <div className="favorites-grid">
          {sortedFavorites.map(note => (
            <div key={note.id} className="favorite-note-card">
              <NoteCard
                note={note}
                onView={handleViewNote}
                onLike={handleNoteAction}
                onFavorite={handleNoteAction}
                onComment={handleNoteAction}
                onDownload={handleDownload}
              />

              <div className="favorite-info">
                <span className="favorited-date">
                  Favorited {note.favoritedDate}
                </span>
                <button
                  className="remove-favorite-btn"
                  onClick={() => handleRemoveFavorite(note.id)}
                >
                  Remove from Favorites
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">📚</div>
          <h3>No Favorite Notes</h3>
          <p>Start adding notes to your favorites by clicking star icon while browsing</p>
          <button
            className="browse-btn"
            onClick={() => navigate('/browse')}
          >
            Browse Notes
          </button>
        </div>
      )}
    </div>
  );
};

export default Favorites;
