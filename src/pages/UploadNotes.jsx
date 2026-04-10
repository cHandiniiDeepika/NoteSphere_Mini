import React, { useState, useMemo, useEffect } from 'react';
import { getAllBranches, getYearsForBranch, getAllSubjects, getSubjectsForBranch } from '../utils/subjectsData';
import './UploadNotes.css';

const UploadNotes = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    branch: '',
    year: '',
    subject: '',
    tags: '',
    file: null
  });
  
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Dynamic dropdown options
  const branches = getAllBranches();
  const availableYears = formData.branch ? getYearsForBranch(formData.branch) : ['1st Year', '2nd Year', '3rd Year', '4th Year'];
  
  const availableSubjects = useMemo(() => {
    if (formData.branch && formData.year) {
      const subjectsForYear = [];
      const semesters = ["1st Semester", "2nd Semester", "3rd Semester", "4th Semester", "5th Semester", "6th Semester", "7th Semester", "8th Semester"];
      semesters.forEach(sem => {
        const subjs = getSubjectsForBranch(formData.branch, formData.year, sem);
        if (subjs.length > 0) subjectsForYear.push(...subjs);
      });
      return [...new Set(subjectsForYear)].sort();
    }
    return getAllSubjects();
  }, [formData.branch, formData.year]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      
      // Auto-clear dependent fields if parent changes
      if (name === 'branch') {
        newData.year = '';
        newData.subject = '';
      } else if (name === 'year') {
        newData.subject = '';
      }
      
      return newData;
    });
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        file
      }));
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf') {
        setFormData(prev => ({
          ...prev,
          file
        }));
      } else {
        alert('Please upload a PDF file');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.file) {
      alert('Please select a file to upload');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          alert('Note uploaded successfully!');
          // Reset form
          setFormData({
            title: '',
            description: '',
            branch: '',
            year: '',
            subject: '',
            tags: '',
            file: null
          });
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <div className="upload-page">
      <div className="upload-container">
        <div className="upload-header">
          <h1>Upload Notes</h1>
          <p>Share your knowledge with the community</p>
        </div>

        <form className="upload-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Left Column */}
            <div className="form-column">
              <div className="form-group">
                <label htmlFor="title">Note Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter a descriptive title"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  placeholder="Describe what your notes cover..."
                  rows={4}
                />
              </div>

              <div className="form-group">
                <label htmlFor="tags">Tags</label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="e.g., calculus, algebra, important (comma separated)"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="form-column">
              <div className="form-group">
                <label htmlFor="branch">Branch *</label>
                <select
                  id="branch"
                  name="branch"
                  value={formData.branch}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Branch</option>
                  {branches.map(branch => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="year">Year *</label>
                <select
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Year</option>
                  {availableYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Subject</option>
                  {availableSubjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* File Upload Area */}
          <div className="file-upload-section">
            <label className="form-label">Upload PDF File *</label>
            <div
              className={`file-drop-area ${dragActive ? 'active' : ''} ${formData.file ? 'has-file' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="file-input"
              />
              
              {!formData.file ? (
                <div className="file-prompt">
                  <div className="file-icon">📄</div>
                  <p>Drag and drop your PDF here or click to browse</p>
                  <p className="file-hint">Maximum file size: 10MB</p>
                </div>
              ) : (
                <div className="file-info">
                  <div className="file-icon">✅</div>
                  <p className="file-name">{formData.file.name}</p>
                  <p className="file-size">{(formData.file.size / 1024 / 1024).toFixed(2)} MB</p>
                  <button
                    type="button"
                    className="remove-file"
                    onClick={() => setFormData(prev => ({ ...prev, file: null }))}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <div className="upload-progress">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="progress-text">Uploading... {uploadProgress}%</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="form-actions">
            <button
              type="submit"
              className="submit-btn"
              disabled={isUploading || !formData.file}
            >
              {isUploading ? 'Uploading...' : 'Upload Notes'}
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadNotes;
