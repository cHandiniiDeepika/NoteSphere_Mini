import React, { useState } from 'react';
import './NoteCard.css';

const NoteCard = ({ note, onView, onLike, onComment, onFavorite, onDownload, showActions = true }) => {
  const [isLiked, setIsLiked] = useState(note.isLiked || false);
  const [isFavorited, setIsFavorited] = useState(note.isFavorited || false);
  const [likesCount, setLikesCount] = useState(note.likes || 0);
  const [downloadsCount, setDownloadsCount] = useState(note.downloads || 0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    if (onLike) onLike(note.id, !isLiked);
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    if (onFavorite) onFavorite(note.id, !isFavorited);
  };

  const handleDownload = async () => {
    if (isDownloading) return;
    
    setIsDownloading(true);
    try {
      // Create download link
      const link = document.createElement('a');
      link.href = note.downloadUrl;
      link.download = `${note.title}.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Update download count
      setDownloadsCount(downloadsCount + 1);
      if (onDownload) onDownload(note.id);
      
      // Show success feedback
      setTimeout(() => setIsDownloading(false), 2000);
    } catch (error) {
      console.error('Download failed:', error);
      setIsDownloading(false);
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
    if (onView) onView(note.id);
  };

  const closePreview = () => {
    setShowPreview(false);
  };

  const formatFileSize = (size) => {
    return size || 'Unknown size';
  };

  const formatPageCount = (pages) => {
    return pages ? `${pages} pages` : 'Unknown pages';
  };

  return (
    <>
      <div className="note-card">
        <div className="note-header">
          <div className="note-thumbnail">
            {note.thumbnail ? (
              <img src={note.thumbnail} alt={note.title} />
            ) : (
              <div className="placeholder-thumbnail">
                <span>📄</span>
              </div>
            )}
          </div>
          <div className="note-info">
            <h3 className="note-title">{note.title}</h3>
            <p className="note-description">{note.description}</p>
            <div className="note-meta">
              <span className="note-author">by {note.author}</span>
              <span className="note-date">{note.uploadDate}</span>
              <span className="note-size">{formatFileSize(note.fileSize)}</span>
              <span className="note-pages">{formatPageCount(note.pageCount)}</span>
            </div>
          </div>
        </div>
        
        <div className="note-tags">
          {note.tags && note.tags.map((tag, index) => (
            <span key={index} className={`tag tag-${tag.color || 'default'}`}>
              #{tag.name}
            </span>
          ))}
        </div>
        
        <div className="note-stats">
          <div className="stat-item">
            <span className="stat-icon">👁️</span>
            <span className="stat-value">{note.views || 0}</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">💬</span>
            <span className="stat-value">{note.comments || 0}</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">⬇️</span>
            <span className="stat-value">{downloadsCount}</span>
          </div>
        </div>
        
        {showActions && (
          <div className="note-actions">
            <button 
              className={`action-btn like-btn ${isLiked ? 'active' : ''}`}
              onClick={handleLike}
              title="Like this note"
            >
              <span className="action-icon">❤️</span>
              <span className="action-count">{likesCount}</span>
            </button>
            
            <button 
              className={`action-btn favorite-btn ${isFavorited ? 'active' : ''}`}
              onClick={handleFavorite}
              title="Add to favorites"
            >
              <span className="action-icon">⭐</span>
              <span className="action-text">Favorite</span>
            </button>
            
            <button 
              className="action-btn comment-btn" 
              onClick={() => onComment && onComment(note.id)}
              title="View comments"
            >
              <span className="action-icon">💬</span>
              <span className="action-text">Comment</span>
            </button>
            
            <button 
              className="action-btn preview-btn" 
              onClick={handlePreview}
              title="Preview PDF"
            >
              <span className="action-icon">👁️</span>
              <span className="action-text">Preview</span>
            </button>
            
            <button 
              className={`action-btn download-btn ${isDownloading ? 'downloading' : ''}`}
              onClick={handleDownload}
              disabled={isDownloading}
              title="Download PDF"
            >
              <span className="action-icon">
                {isDownloading ? '⏳' : '⬇️'}
              </span>
              <span className="action-text">
                {isDownloading ? 'Downloading...' : 'Download'}
              </span>
            </button>
          </div>
        )}
        
        {note.sharedBy && (
          <div className="shared-info">
            <span className="shared-label">Shared by {note.sharedBy}</span>
            <span className="shared-time">? {note.sharedTime}</span>
          </div>
        )}
      </div>

      {/* PDF Preview Modal */}
      {showPreview && (
        <div className="pdf-preview-modal" onClick={closePreview}>
          <div className="pdf-preview-container" onClick={(e) => e.stopPropagation()}>
            <div className="pdf-preview-header">
              <h3>{note.title}</h3>
              <button className="close-preview-btn" onClick={closePreview}>×</button>
            </div>
            <div className="pdf-preview-content">
              <iframe
                src={`https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(note.previewUrl)}`}
                title={`Preview of ${note.title}`}
                className="pdf-preview-iframe"
                frameBorder="0"
                width="100%"
                height="100%"
              />
            </div>
            <div className="pdf-preview-actions">
              <button className="preview-download-btn" onClick={handleDownload}>
                <span>⬇️</span>
                Download PDF
              </button>
              <button className="preview-close-btn" onClick={closePreview}>
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NoteCard;
