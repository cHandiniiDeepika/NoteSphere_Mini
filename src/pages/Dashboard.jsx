import React, { useState, useMemo } from 'react';
import NoteCard from '../components/NoteCard';
import { ALL_MOCK_NOTES } from '../utils/mockData';
import './Dashboard.css';
const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock data dynamically fetched from global simulated dataset
  const popularNotes = useMemo(() => {
    return [...ALL_MOCK_NOTES].sort((a, b) => b.views - a.views).slice(0, 3);
  }, []);

  const sharedNotes = useMemo(() => {
    return ALL_MOCK_NOTES.filter(note => note.sharedBy).slice(0, 2);
  }, []);

  const collaborationFeed = [
    {
      id: 1,
      user: 'Megan',
      action: 'Uploaded',
      note: 'English Literature Notes',
      time: '10 minutes ago',
      icon: '📤'
    },
    {
      id: 2,
      user: 'Tom',
      action: 'Edited',
      note: 'Physics Revision',
      time: '25 minutes ago',
      icon: '✏️'
    },
    {
      id: 3,
      user: 'Lisa',
      action: 'Commented',
      note: 'Great summary!',
      time: '1 hour ago',
      icon: '💬'
    },
    {
      id: 4,
      user: 'David',
      action: 'Liked',
      note: 'Chemistry Guide',
      time: '2 hours ago',
      icon: '❤️'
    }
  ];

  const handleNoteAction = (noteId, action, value) => {
    console.log(`Note ${noteId} ${action}:`, value);
  };

  const handleViewNote = (noteId) => {
    console.log('Viewing note:', noteId);
  };

  return (
    <div className="dashboard">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}
      
      <div className="dashboard-container">
        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <button 
            className="sidebar-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            ✕
          </button>
          
          <div className="sidebar-header">
            <h2 className="app-title">
              <span className="app-icon">📚</span>
              StudyShare
            </h2>
          </div>
          
          <nav className="sidebar-nav">
            <div className="nav-item active">
              <span className="nav-icon">📄</span>
              <span>All Notes</span>
            </div>
            <div className="nav-item">
              <span className="nav-icon">📝</span>
              <span>My Notes</span>
            </div>
            <div className="nav-item">
              <span className="nav-icon">👥</span>
              <span>Shared with Me</span>
              <span className="notification-badge">5</span>
            </div>
            <div className="nav-item">
              <span className="nav-icon">❤️</span>
              <span>Favorites</span>
            </div>
          </nav>
          
          <div className="sidebar-section">
            <h3 className="section-title">Tags</h3>
            <div className="tags-list">
              <div className="tag-item biology">
                <span># Biology</span>
              </div>
              <div className="tag-item math">
                <span># Math</span>
              </div>
              <div className="tag-item history">
                <span># History</span>
              </div>
            </div>
          </div>
          
          <div className="sidebar-section">
            <h3 className="section-title">Recent Activity</h3>
            <div className="activity-list">
              <div className="activity-item">
                <span className="activity-text">Alex commented on 'Lecture Notes'</span>
              </div>
              <div className="activity-item">
                <span className="activity-text">Sarah shared 'Chemistry Guide'</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <div className="content-header">
            <button 
              className="sidebar-toggle btn btn-secondary"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle sidebar"
            >
              <span className="btn-icon">☰</span>
              Menu
            </button>
            
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>
            
            <div className="header-actions">
              <button className="btn btn-primary">
                <span className="btn-icon">➕</span>
                New Note
              </button>
              <button className="btn btn-secondary">
                <span className="btn-icon">📤</span>
                Upload
              </button>
            </div>
          </div>

          {/* Popular Notes Section */}
          <section className="notes-section">
            <h2 className="section-heading">Popular Notes</h2>
            <div className="notes-grid">
              {popularNotes.map(note => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onView={handleViewNote}
                  onLike={handleNoteAction}
                  onFavorite={handleNoteAction}
                  onComment={handleNoteAction}
                />
              ))}
            </div>
          </section>

          {/* Shared Notes Section */}
          <section className="notes-section">
            <h2 className="section-heading">Shared Notes</h2>
            
            <div className="filter-tabs">
              <button
                className={`tab ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All
              </button>
              <button
                className={`tab ${activeTab === 'shared' ? 'active' : ''}`}
                onClick={() => setActiveTab('shared')}
              >
                Shared with Me
              </button>
              <button
                className={`tab ${activeTab === 'favorites' ? 'active' : ''}`}
                onClick={() => setActiveTab('favorites')}
              >
                Favorites
              </button>
            </div>
            
            <div className="notes-grid">
              {sharedNotes.map(note => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onView={handleViewNote}
                  onLike={handleNoteAction}
                  onFavorite={handleNoteAction}
                  onComment={handleNoteAction}
                />
              ))}
            </div>
          </section>
        </main>

        {/* Collaboration Feed */}
        <aside className="collaboration-feed">
          <h2 className="feed-title">Collaboration Feed</h2>
          <div className="feed-list">
            {collaborationFeed.map(activity => (
              <div key={activity.id} className="feed-item">
                <div className="feed-avatar">
                  <span className="avatar-icon">👤</span>
                </div>
                <div className="feed-content">
                  <div className="feed-user">{activity.user}:</div>
                  <div className="feed-action">
                    {activity.action} <span className="feed-note">"{activity.note}"</span>
                  </div>
                  <div className="feed-time">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
