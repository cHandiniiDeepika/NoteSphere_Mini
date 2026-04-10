import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/FireBaseConfig';
import { useNavigate } from 'react-router-dom';
import { BTECH_SUBJECTS, getSubjectsForBranch, getAllSubjects } from '../utils/subjectsData';
import SubjectSearch from '../components/SubjectSearch';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchSubject, setSearchSubject] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: user?.email?.split('@')[0]?.charAt(0)?.toUpperCase() || 'U',
    lastName: 'User',
    bio: 'Passionate about sharing knowledge and helping others learn. Currently studying Computer Science.',
    branch: 'CSE',
    year: '1st Year',
    semester: '1st Semester',
    subjects: ['Engineering Mathematics-I', 'Engineering Physics', 'Engineering Chemistry'],
    interests: ['Programming', 'Mathematics', 'Physics', 'Machine Learning'],
    socialLinks: {
      github: 'https://github.com/username',
      linkedin: 'https://linkedin.com/in/username',
      twitter: 'https://twitter.com/username'
    }
  });

  const [editedData, setEditedData] = useState({ ...profileData });

  const userStats = {
    totalNotes: 24,
    totalViews: 1250,
    totalDownloads: 340,
    totalLikes: 89,
    favorites: 15,
    joinedDate: 'January 2024',
    lastActive: '2 hours ago'
  };

  const recentActivity = [
    { id: 1, type: 'upload', title: 'Physics Revision Notes', time: '2 days ago', icon: '📤' },
    { id: 2, type: 'favorite', title: 'Chemistry Guide', time: '3 days ago', icon: '❤️' },
    { id: 3, type: 'comment', title: 'Data Structures and Algorithms', time: '1 week ago', icon: '💬' },
    { id: 4, type: 'upload', title: 'Mathematics Basics', time: '2 weeks ago', icon: '📤' },
    { id: 5, type: 'download', title: 'Biology Notes', time: '3 weeks ago', icon: '⬇️' }
  ];

  const achievements = [
    { id: 1, name: 'First Upload', description: 'Uploaded your first note', icon: '🎯', earned: true },
    { id: 2, name: 'Popular Contributor', description: 'Received 100+ total views', icon: '⭐', earned: true },
    { id: 3, name: 'Helpful Member', description: 'Received 50+ likes', icon: '👍', earned: true },
    { id: 4, name: 'Active Sharer', description: 'Uploaded 10+ notes', icon: '📚', earned: true },
    { id: 5, name: 'Community Favorite', description: 'Received 100+ downloads', icon: '🏆', earned: false },
    { id: 6, name: 'Knowledge Master', description: 'Uploaded 25+ notes', icon: '🎓', earned: false }
  ];

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/signin');
  };

  const handleEditProfile = () => {
    setIsEditing(true);
    setEditedData({ ...profileData });
    // Don't switch tabs - show unified editing view
  };

  const handleSaveProfile = () => {
    setProfileData({ ...editedData });
    setIsEditing(false);
    setSuccessMessage('Profile updated successfully!');
    setShowSuccessMessage(true);
    // Auto-hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedData({ ...profileData });
    setActiveTab('overview'); // Switch back to overview when cancelling
  };

  const handleInputChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBranchChange = (value) => {
    setEditedData(prev => ({
      ...prev,
      branch: value,
      year: '1st Year', // Reset year when branch changes
      semester: '1st Semester', // Reset semester when branch changes
      subjects: [] // Reset subjects when branch changes
    }));
    setSearchSubject('');
  };

  const handleYearChange = (value) => {
    setEditedData(prev => ({
      ...prev,
      year: value,
      semester: '1st Semester', // Reset semester when year changes
      subjects: [] // Reset subjects when year changes
    }));
    setSearchSubject('');
  };

  const handleSemesterChange = (value) => {
    setEditedData(prev => ({
      ...prev,
      semester: value,
      subjects: [] // Reset subjects when semester changes
    }));
    setSearchSubject('');
  };

  const handleSubjectToggle = (subject) => {
    const subjects = editedData.subjects.includes(subject)
      ? editedData.subjects.filter(s => s !== subject)
      : [...editedData.subjects, subject];
    
    setEditedData(prev => ({
      ...prev,
      subjects
    }));
  };

  // Get available subjects for current branch, year and semester
  const getAvailableSubjects = () => {
    return getSubjectsForBranch(editedData.branch, editedData.year, editedData.semester);
  };

  // Filter subjects based on search
  const filteredSubjects = useMemo(() => {
    const available = getAvailableSubjects();
    if (!searchSubject.trim()) return available;
    return available.filter(subject =>
      subject.toLowerCase().includes(searchSubject.toLowerCase())
    );
  }, [editedData.branch, editedData.year, editedData.semester, searchSubject]);

  const handleInterestToggle = (interest) => {
    const interests = editedData.interests.includes(interest)
      ? editedData.interests.filter(i => i !== interest)
      : [...editedData.interests, interest];
    
    setEditedData(prev => ({
      ...prev,
      interests
    }));
  };

  const handleSocialLinkChange = (platform, value) => {
    setEditedData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(true);
  };

  const confirmDeleteAccount = () => {
    console.log('Account deletion requested');
    setShowDeleteModal(false);
    // In a real app, this would call a backend service
  };

  const allInterests = ['Programming', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Machine Learning', 'Web Development', 'Data Science', 'Electronics', 'Mechanics'];

  return (
    <div className="profile-page">
      {showSuccessMessage && (
        <div className="success-message">
          <span>✅</span>
          <span>{successMessage}</span>
        </div>
      )}
      <div className="profile-container">
        {/* Compact Header */}
        <div className="profile-header">
          <div className="header-content">
            <div className="header-left">
              <div className="profile-avatar">
                <div className="avatar-placeholder">
                  <span>{profileData.firstName[0]}{profileData.lastName[0]}</span>
                </div>
                <div className="avatar-status online"></div>
              </div>
              <div className="header-info">
                <h1 className="profile-name">{profileData.firstName} {profileData.lastName}</h1>
                <p className="profile-email">{user?.email}</p>
                <div className="profile-meta">
                  <span className="meta-item">
                    <span className="meta-icon">📚</span>
                    {profileData.branch} • {profileData.year}
                  </span>
                  <span className="meta-item">
                    <span className="meta-icon">📅</span>
                    {profileData.semester}
                  </span>
                </div>
              </div>
            </div>

            <div className="header-actions">
              {isEditing ? (
                <>
                  <button className="btn btn-success" onClick={handleSaveProfile}>
                    <span>✅</span>
                    Save Changes
                  </button>
                  <button className="btn btn-secondary" onClick={handleCancelEdit}>
                    <span>❌</span>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button className="btn btn-primary" onClick={handleEditProfile}>
                    <span>✏️</span>
                    Edit Profile
                  </button>
                  <button className="btn btn-secondary" onClick={handleSignOut}>
                    <span>🚪</span>
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="stats-overview">
          <div className="stat-card">
            <div className="stat-icon">📄</div>
            <div className="stat-info">
              <h3>{userStats.totalNotes}</h3>
              <p>Notes Uploaded</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👁️</div>
            <div className="stat-info">
              <h3>{userStats.totalViews}</h3>
              <p>Total Views</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⬇️</div>
            <div className="stat-info">
              <h3>{userStats.totalDownloads}</h3>
              <p>Downloads</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💖</div>
            <div className="stat-info">
              <h3>{userStats.totalLikes}</h3>
              <p>Likes Received</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">❤️</div>
            <div className="stat-info">
              <h3>{userStats.favorites}</h3>
              <p>Favorites</p>
            </div>
          </div>
        </div>

        {/* Editing Form - Show when isEditing is true */}
        {isEditing && (
          <div className="editing-form-container">
            <div className="form-header">
              <h2>Edit Profile</h2>
              <p>Update your personal information and academic details</p>
            </div>
            
            <div className="form-grid">
              {/* Personal Information */}
              <div className="form-section">
                <h3>Personal Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      value={editedData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      value={editedData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="bio">Bio</label>
                  <textarea
                    id="bio"
                    value={editedData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    className="form-textarea"
                    rows="3"
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </div>

              {/* Academic Information */}
              <div className="form-section">
                <h3>Academic Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="branch">Branch</label>
                    <select
                      id="branch"
                      value={editedData.branch}
                      onChange={(e) => handleBranchChange(e.target.value)}
                      className="form-select"
                    >
                      <option value="CSE">Computer Science Engineering</option>
                      <option value="AIML">Artificial Intelligence & Machine Learning</option>
                      <option value="CSM">Computer Science & Security</option>
                      <option value="AIDS">Artificial Intelligence & Data Science</option>
                      <option value="MECH">Mechanical Engineering</option>
                      <option value="CIVIL">Civil Engineering</option>
                      <option value="ECE">Electronics & Communication Engineering</option>
                      <option value="EEE">Electrical & Electronics Engineering</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="year">Year</label>
                    <select
                      id="year"
                      value={editedData.year}
                      onChange={(e) => handleYearChange(e.target.value)}
                      className="form-select"
                    >
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="semester">Semester</label>
                  <select
                    id="semester"
                    value={editedData.semester}
                    onChange={(e) => handleSemesterChange(e.target.value)}
                    className="form-select"
                  >
                    {editedData.year === '1st Year' && (
                      <>
                        <option value="1st Semester">1st Semester</option>
                        <option value="2nd Semester">2nd Semester</option>
                      </>
                    )}
                    {editedData.year === '2nd Year' && (
                      <>
                        <option value="3rd Semester">3rd Semester</option>
                        <option value="4th Semester">4th Semester</option>
                      </>
                    )}
                    {editedData.year === '3rd Year' && (
                      <>
                        <option value="5th Semester">5th Semester</option>
                        <option value="6th Semester">6th Semester</option>
                      </>
                    )}
                    {editedData.year === '4th Year' && (
                      <>
                        <option value="7th Semester">7th Semester</option>
                        <option value="8th Semester">8th Semester</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              {/* Subjects Selection */}
              <div className="form-section">
                <h3>Current Subjects</h3>
                <div className="form-group">
                  <label>Search and Add Subjects</label>
                  <SubjectSearch
                    onSubjectSelect={handleSubjectToggle}
                    placeholder="Search subjects..."
                    branch={editedData.branch}
                    year={editedData.year}
                    semester={editedData.semester}
                    showAllSubjects={true}
                    className="profile-subject-search"
                  />
                </div>
                
                <div className="subjects-list-container">
                  <h4>Available Subjects for {editedData.branch} - {editedData.year} - {editedData.semester}</h4>
                  <div className="subjects-list">
                    {(() => {
                      const available = getAvailableSubjects();
                      const filtered = !searchSubject.trim() 
                        ? available 
                        : available.filter(subject =>
                            subject.toLowerCase().includes(searchSubject.toLowerCase())
                          );
                      
                      console.log('Available subjects:', available);
                      console.log('Filtered subjects:', filtered);
                      console.log('Search term:', searchSubject);
                      console.log('Branch:', editedData.branch, 'Year:', editedData.year, 'Semester:', editedData.semester);
                      
                      // If no subjects found, show all subjects as fallback
                      if (available.length === 0) {
                        const allSubjects = getAllSubjects();
                        const allFiltered = !searchSubject.trim()
                          ? allSubjects
                          : allSubjects.filter(subject =>
                              subject.toLowerCase().includes(searchSubject.toLowerCase())
                            );
                        
                        return (
                          <div>
                            <p style={{color: '#6b7280', fontStyle: 'italic', marginBottom: '1rem'}}>
                              No subjects found for current selection. Showing all B.Tech subjects:
                            </p>
                            {allFiltered.length > 0 ? (
                              allFiltered.map(subject => (
                                <div
                                  key={subject}
                                  className={`subject-item ${editedData.subjects.includes(subject) ? 'selected' : ''}`}
                                  onClick={() => handleSubjectToggle(subject)}
                                >
                                  <div className="subject-checkbox-custom">
                                    <input
                                      type="checkbox"
                                      checked={editedData.subjects.includes(subject)}
                                      onChange={() => handleSubjectToggle(subject)}
                                    />
                                    <span className="checkmark"></span>
                                  </div>
                                  <span className="subject-name">{subject}</span>
                                  {editedData.subjects.includes(subject) && (
                                    <span className="selected-indicator">?</span>
                                  )}
                                </div>
                              ))
                            ) : (
                              <div className="no-subjects-found">
                                <p>No subjects found matching "{searchSubject}"</p>
                                <p>Try searching with different keywords</p>
                              </div>
                            )}
                          </div>
                        );
                      }
                      
                      return filtered.length > 0 ? (
                        filtered.map(subject => (
                          <div
                            key={subject}
                            className={`subject-item ${editedData.subjects.includes(subject) ? 'selected' : ''}`}
                            onClick={() => handleSubjectToggle(subject)}
                          >
                            <div className="subject-checkbox-custom">
                              <input
                                type="checkbox"
                                checked={editedData.subjects.includes(subject)}
                                onChange={() => handleSubjectToggle(subject)}
                              />
                              <span className="checkmark"></span>
                            </div>
                            <span className="subject-name">{subject}</span>
                            {editedData.subjects.includes(subject) && (
                              <span className="selected-indicator">?</span>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="no-subjects-found">
                          <p>No subjects found matching "{searchSubject}"</p>
                          <p>Try searching with different keywords</p>
                          <p>Available subjects count: {available.length}</p>
                        </div>
                      );
                    })()}
                  </div>
                </div>
                
                {editedData.subjects.length > 0 && (
                  <div className="selected-subjects">
                    <h4>Selected Subjects ({editedData.subjects.length})</h4>
                    <div className="selected-list">
                      {editedData.subjects.map(subject => (
                        <span key={subject} className="selected-subject">
                          {subject}
                          <button onClick={() => handleSubjectToggle(subject)}>×</button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Interests */}
              <div className="form-section">
                <h3>Interests</h3>
                <div className="interests-grid">
                  {allInterests.map(interest => (
                    <div
                      key={interest}
                      className={`interest-checkbox ${editedData.interests.includes(interest) ? 'selected' : ''}`}
                      onClick={() => handleInterestToggle(interest)}
                    >
                      <input
                        type="checkbox"
                        checked={editedData.interests.includes(interest)}
                        onChange={() => handleInterestToggle(interest)}
                      />
                      <label>{interest}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="form-section">
                <h3>Social Links</h3>
                <div className="form-group">
                  <label htmlFor="github">GitHub</label>
                  <input
                    type="url"
                    id="github"
                    value={editedData.socialLinks.github}
                    onChange={(e) => handleSocialLinkChange('github', e.target.value)}
                    className="form-input"
                    placeholder="https://github.com/username"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="linkedin">LinkedIn</label>
                  <input
                    type="url"
                    id="linkedin"
                    value={editedData.socialLinks.linkedin}
                    onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                    className="form-input"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="twitter">Twitter</label>
                  <input
                    type="url"
                    id="twitter"
                    value={editedData.socialLinks.twitter}
                    onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                    className="form-input"
                    placeholder="https://twitter.com/username"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content - Two Column Layout */}
        <div className="main-content">
          <div className="content-left">
            {/* About Me Section */}
            <div className="content-card">
              <h3>About Me</h3>
              <p className="bio-text">{profileData.bio}</p>
            </div>

            {/* Interests Section */}
            <div className="content-card">
              <h3>Interests</h3>
              <div className="interests-display">
                {profileData.interests.map(interest => (
                  <span key={interest} className="interest-item">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="content-right">
            {/* Social Links Section */}
            <div className="content-card">
              <h3>Social Links</h3>
              <div className="social-links-display">
                {profileData.socialLinks.github && (
                  <a href={profileData.socialLinks.github} target="_blank" rel="noopener noreferrer" className="social-link">
                    <span>🐙</span> GitHub
                  </a>
                )}
                {profileData.socialLinks.linkedin && (
                  <a href={profileData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                    <span>💼</span> LinkedIn
                  </a>
                )}
                {profileData.socialLinks.twitter && (
                  <a href={profileData.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="social-link">
                    <span>🐦</span> Twitter
                  </a>
                )}
              </div>
            </div>

            {/* Academic Info Section */}
            <div className="content-card">
              <h3>Academic Information</h3>
              <div className="academic-info">
                <div className="info-item">
                  <span className="info-label">Branch:</span>
                  <span className="info-value">{profileData.branch}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Year:</span>
                  <span className="info-value">{profileData.year}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Semester:</span>
                  <span className="info-value">{profileData.semester}</span>
                </div>
                <div className="subjects-summary">
                  <span className="info-label">Current Subjects ({profileData.subjects.length}):</span>
                  <div className="subjects-list">
                    {profileData.subjects.slice(0, 3).map(subject => (
                      <span key={subject} className="subject-chip">
                        {subject}
                      </span>
                    ))}
                    {profileData.subjects.length > 3 && (
                      <span className="subject-more">+{profileData.subjects.length - 3} more</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Delete Account Modal */}
        {showDeleteModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Delete Account</h3>
              <p>Are you sure you want to delete your account? This action cannot be undone and will permanently delete all your data, including uploaded notes, comments, and profile information.</p>
              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={confirmDeleteAccount}>
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
