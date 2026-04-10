import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteCard from '../components/NoteCard';
import { ALL_MOCK_NOTES } from '../utils/mockData';
import './MyNotes.css';

const MyNotes = () => {
    const navigate = useNavigate();
    
    // Filter notes authored by current simulated user
    const notes = useMemo(() => {
        return ALL_MOCK_NOTES.filter(note => note.author === 'You');
    }, []);

    const handleNoteAction = (noteId, action, value) => {
        console.log(`Note ${noteId} ${action}:`, value);
        
        switch (action) {
            case 'download':
                console.log(`Downloaded note: ${noteId}`);
                break;
            case 'like':
                console.log(`Liked note: ${noteId}`);
                break;
            case 'favorite':
                console.log(`Favorited note: ${noteId}`);
                break;
            case 'view':
                console.log(`Viewed note: ${noteId}`);
                break;
            default:
                break;
        }
    };

    const handleViewNote = (noteId) => {
        handleNoteAction(noteId, 'view', null);
    };

    const handleDownload = (noteId) => {
        handleNoteAction(noteId, 'download', null);
    };

    const handleEditNote = (noteId) => {
        console.log(`Editing note: ${noteId}`);
        // Navigate to edit page or open edit modal
    };

    const handleDeleteNote = (noteId) => {
        console.log(`Deleting note: ${noteId}`);
        // Show confirmation dialog and delete note
    };

    return (
        <div className="my-notes-page">
            <div className="my-notes-container">
                <header className="my-notes-header">
                    <div className="header-content">
                        <h1>My Workspace</h1>
                        <p>Manage, edit, and organize all the notes you've uploaded.</p>
                    </div>
                    <button className="create-new-btn" onClick={() => navigate('/upload')}>
                        <span>+</span> Upload New Note
                    </button>
                </header>

                <div className="notes-list-section">
                    {notes.length > 0 ? (
                        <div className="notes-grid">
                            {notes.map(note => (
                                <div key={note.id} className="note-card-wrapper">
                                    <NoteCard 
                                        note={note} 
                                        showActions={true}
                                        onView={handleViewNote}
                                        onLike={handleNoteAction}
                                        onFavorite={handleNoteAction}
                                        onComment={handleNoteAction}
                                        onDownload={handleDownload}
                                    />
                                    <div className="note-management-actions">
                                        <button className="manage-btn edit" onClick={() => handleEditNote(note.id)}>
                                            ? Edit
                                        </button>
                                        <button className="manage-btn delete" onClick={() => handleDeleteNote(note.id)}>
                                            ? Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-notes-state">
                            <span className="empty-icon">?</span>
                            <h2>Your workspace is empty</h2>
                            <p>You haven't uploaded any notes yet. Share your knowledge with the community!</p>
                            <button className="cta-btn" onClick={() => navigate('/upload')}>
                                Start Uploading
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyNotes;
