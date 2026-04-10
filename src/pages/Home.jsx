import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="home-hero-section">
        <h1 className="hero-title">Welcome to NoteSphere</h1>
        <p className="hero-subtitle">
          Your centralized hub to discover, share, and manage all your academic notes in one seamless experience.
        </p>
        <div className="hero-buttons">
          <button className="primary-action-btn" onClick={() => navigate('/browse')}>
            Browse Library
          </button>
          <button className="secondary-action-btn" onClick={() => navigate('/upload')}>
            Upload a Note
          </button>
        </div>
      </div>

      <div className="home-quick-links">
        <div className="quick-card" onClick={() => navigate('/my-notes')}>
          <div className="quick-icon">📁</div>
          <h3>My Workspace</h3>
          <p>Manage, edit, and organize all the notes you've uploaded to the platform.</p>
        </div>
        
        <div className="quick-card" onClick={() => navigate('/favorites')}>
          <div className="quick-icon">⭐</div>
          <h3>Favorites</h3>
          <p>Quickly access the top notes you've saved and use most often for your classes.</p>
        </div>

        <div className="quick-card" onClick={() => navigate('/profile')}>
          <div className="quick-icon">👤</div>
          <h3>Profile Setup</h3>
          <p>Review and update your university details, bio, and subjects of interest.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
