import React, { useState, useMemo, useEffect } from 'react';
import './BrowseNotes.css';

const BrowseNotes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [viewMode, setViewMode] = useState('grid');
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error loading favorites:', error);
        setFavorites([]);
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Comprehensive B.Tech mock data with real subjects and branches
  const ALL_MOCK_NOTES = [
    // CSE Branch
    {
      id: 1,
      title: 'Data Structures and Algorithms',
      description: 'Complete guide to data structures including arrays, linked lists, stacks, queues, trees, and graphs with algorithm analysis',
      author: 'Prof. R. Kumar',
      branch: 'CSE',
      year: '2nd Year',
      subject: 'Data Structures',
      thumbnail: 'https://picsum.photos/seed/dsa/200/280',
      fileUrl: 'https://www.africau.edu/images/default/sample.pdf',
      previewUrl: 'https://www.africau.edu/images/default/sample.pdf',
      fileSize: '4.2 MB',
      pages: 156,
      rating: 4.8,
      downloads: 892,
      views: 2341,
      likes: 234,
      uploadDate: '2024-01-15'
    },
    {
      id: 2,
      title: 'Database Management Systems',
      description: 'Comprehensive notes on DBMS concepts, SQL, normalization, ER diagrams, and relational database design',
      author: 'Dr. S. Reddy',
      branch: 'CSE',
      year: '3rd Year',
      subject: 'Database',
      thumbnail: 'https://picsum.photos/seed/database/200/280',
      fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      previewUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      fileSize: '3.8 MB',
      pages: 142,
      rating: 4.7,
      downloads: 756,
      views: 1987,
      likes: 189,
      uploadDate: '2024-01-14'
    },
    {
      id: 3,
      title: 'Operating Systems',
      description: 'Detailed notes on OS concepts, process management, memory management, file systems, and synchronization',
      author: 'Prof. M. Gupta',
      branch: 'CSE',
      year: '3rd Year',
      subject: 'Operating Systems',
      thumbnail: 'https://picsum.photos/seed/os/200/280',
      fileUrl: 'https://www.adobe.com/support/products/reader/downloads/sample.pdf',
      previewUrl: 'https://www.adobe.com/support/products/reader/downloads/sample.pdf',
      fileSize: '5.1 MB',
      pages: 189,
      rating: 4.9,
      downloads: 923,
      views: 2876,
      likes: 267,
      uploadDate: '2024-01-13'
    },
    // ECE Branch
    {
      id: 4,
      title: 'Digital Signal Processing',
      description: 'Complete guide to DSP fundamentals, Fourier transforms, digital filters, and signal analysis techniques',
      author: 'Dr. A. Sharma',
      branch: 'ECE',
      year: '3rd Year',
      subject: 'DSP',
      thumbnail: 'https://picsum.photos/seed/dsp/200/280',
      fileUrl: 'https://www.learningcontainer.com/wp-content/uploads/2019/09/sample-pdf-file.pdf',
      previewUrl: 'https://www.learningcontainer.com/wp-content/uploads/2019/09/sample-pdf-file.pdf',
      fileSize: '3.4 MB',
      pages: 128,
      rating: 4.6,
      downloads: 645,
      views: 1654,
      likes: 156,
      uploadDate: '2024-01-12'
    },
    {
      id: 5,
      title: 'Analog Electronics',
      description: 'Comprehensive notes on semiconductor devices, amplifiers, oscillators, and analog circuit design',
      author: 'Prof. P. Singh',
      branch: 'ECE',
      year: '2nd Year',
      subject: 'Electronics',
      thumbnail: 'https://picsum.photos/seed/analog/200/280',
      fileUrl: 'https://file-examples.com/storage/fe86c4e2be62b8ed5a4510c/2017/10/file_example_PDF_1MB.pdf',
      previewUrl: 'https://file-examples.com/storage/fe86c4e2be62b8ed5a4510c/2017/10/file_example_PDF_1MB.pdf',
      fileSize: '2.9 MB',
      pages: 98,
      rating: 4.5,
      downloads: 523,
      views: 1432,
      likes: 134,
      uploadDate: '2024-01-11'
    },
    {
      id: 6,
      title: 'Communication Systems',
      description: 'Detailed study of analog and digital communication, modulation techniques, and information theory',
      author: 'Dr. R. Verma',
      branch: 'ECE',
      year: '4th Year',
      subject: 'Communications',
      thumbnail: 'https://picsum.photos/seed/comm/200/280',
      fileUrl: 'https://www.africau.edu/images/default/sample.pdf',
      previewUrl: 'https://www.africau.edu/images/default/sample.pdf',
      fileSize: '4.1 MB',
      pages: 167,
      rating: 4.7,
      downloads: 589,
      views: 1876,
      likes: 178,
      uploadDate: '2024-01-10'
    },
    // EEE Branch
    {
      id: 7,
      title: 'Power Systems',
      description: 'Complete notes on power generation, transmission, distribution, and power system analysis',
      author: 'Prof. S. Kumar',
      branch: 'EEE',
      year: '3rd Year',
      subject: 'Power Systems',
      thumbnail: 'https://picsum.photos/seed/power/200/280',
      fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      previewUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      fileSize: '4.5 MB',
      pages: 178,
      rating: 4.8,
      downloads: 678,
      views: 2098,
      likes: 198,
      uploadDate: '2024-01-09'
    },
    {
      id: 8,
      title: 'Electrical Machines',
      description: 'Comprehensive guide to transformers, DC machines, induction motors, and synchronous machines',
      author: 'Dr. M. Patel',
      branch: 'EEE',
      year: '2nd Year',
      subject: 'Electrical Machines',
      thumbnail: 'https://picsum.photos/seed/machines/200/280',
      fileUrl: 'https://www.adobe.com/support/products/reader/downloads/sample.pdf',
      previewUrl: 'https://www.adobe.com/support/products/reader/downloads/sample.pdf',
      fileSize: '3.7 MB',
      pages: 145,
      rating: 4.6,
      downloads: 567,
      views: 1765,
      likes: 167,
      uploadDate: '2024-01-08'
    },
    {
      id: 9,
      title: 'Control Systems',
      description: 'Detailed notes on control system analysis, stability, controllers, and modern control theory',
      author: 'Prof. N. Reddy',
      branch: 'EEE',
      year: '3rd Year',
      subject: 'Control Systems',
      thumbnail: 'https://picsum.photos/seed/control/200/280',
      fileUrl: 'https://www.learningcontainer.com/wp-content/uploads/2019/09/sample-pdf-file.pdf',
      previewUrl: 'https://www.learningcontainer.com/wp-content/uploads/2019/09/sample-pdf-file.pdf',
      fileSize: '3.2 MB',
      pages: 134,
      rating: 4.7,
      downloads: 612,
      views: 1834,
      likes: 189,
      uploadDate: '2024-01-07'
    },
    // MECH Branch
    {
      id: 10,
      title: 'Thermodynamics',
      description: 'Complete study of laws of thermodynamics, heat transfer, and thermal engineering applications',
      author: 'Dr. R. Sharma',
      branch: 'MECH',
      year: '2nd Year',
      subject: 'Thermodynamics',
      thumbnail: 'https://picsum.photos/seed/thermo/200/280',
      fileUrl: 'https://file-examples.com/storage/fe86c4e2be62b8ed5a4510c/2017/10/file_example_PDF_1MB.pdf',
      previewUrl: 'https://file-examples.com/storage/fe86c4e2be62b8ed5a4510c/2017/10/file_example_PDF_1MB.pdf',
      fileSize: '3.8 MB',
      pages: 156,
      rating: 4.5,
      downloads: 534,
      views: 1567,
      likes: 145,
      uploadDate: '2024-01-06'
    },
    {
      id: 11,
      title: 'Fluid Mechanics',
      description: 'Comprehensive notes on fluid properties, fluid statics, fluid dynamics, and hydraulic machines',
      author: 'Prof. S. Gupta',
      branch: 'MECH',
      year: '3rd Year',
      subject: 'Fluid Mechanics',
      thumbnail: 'https://picsum.photos/seed/fluid/200/280',
      fileUrl: 'https://www.africau.edu/images/default/sample.pdf',
      previewUrl: 'https://www.africau.edu/images/default/sample.pdf',
      fileSize: '4.2 MB',
      pages: 189,
      rating: 4.6,
      downloads: 589,
      views: 1678,
      likes: 178,
      uploadDate: '2024-01-05'
    },
    {
      id: 12,
      title: 'Machine Design',
      description: 'Detailed study of machine elements, design principles, stress analysis, and material selection',
      author: 'Dr. P. Kumar',
      branch: 'MECH',
      year: '4th Year',
      subject: 'Machine Design',
      thumbnail: 'https://picsum.photos/seed/design/200/280',
      fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      previewUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      fileSize: '5.1 MB',
      pages: 201,
      rating: 4.8,
      downloads: 623,
      views: 1923,
      likes: 201,
      uploadDate: '2024-01-04'
    },
    // CIVIL Branch
    {
      id: 13,
      title: 'Structural Analysis',
      description: 'Complete guide to structural analysis methods, determinate and indeterminate structures',
      author: 'Prof. A. Singh',
      branch: 'CIVIL',
      year: '3rd Year',
      subject: 'Structural Analysis',
      thumbnail: 'https://picsum.photos/seed/structural/200/280',
      fileUrl: 'https://www.adobe.com/support/products/reader/downloads/sample.pdf',
      previewUrl: 'https://www.adobe.com/support/products/reader/downloads/sample.pdf',
      fileSize: '4.3 MB',
      pages: 178,
      rating: 4.7,
      downloads: 567,
      views: 1734,
      likes: 189,
      uploadDate: '2024-01-03'
    },
    {
      id: 14,
      title: 'Concrete Technology',
      description: 'Comprehensive notes on concrete properties, mix design, testing, and construction practices',
      author: 'Dr. M. Reddy',
      branch: 'CIVIL',
      year: '2nd Year',
      subject: 'Concrete Technology',
      thumbnail: 'https://picsum.photos/seed/concrete/200/280',
      fileUrl: 'https://www.learningcontainer.com/wp-content/uploads/2019/09/sample-pdf-file.pdf',
      previewUrl: 'https://www.learningcontainer.com/wp-content/uploads/2019/09/sample-pdf-file.pdf',
      fileSize: '3.6 MB',
      pages: 145,
      rating: 4.5,
      downloads: 489,
      views: 1456,
      likes: 156,
      uploadDate: '2024-01-02'
    },
    {
      id: 15,
      title: 'Transportation Engineering',
      description: 'Detailed study of highway engineering, traffic engineering, and transportation planning',
      author: 'Prof. R. Kumar',
      branch: 'CIVIL',
      year: '4th Year',
      subject: 'Transportation',
      thumbnail: 'https://picsum.photos/seed/transport/200/280',
      fileUrl: 'https://file-examples.com/storage/fe86c4e2be62b8ed5a4510c/2017/10/file_example_PDF_1MB.pdf',
      previewUrl: 'https://file-examples.com/storage/fe86c4e2be62b8ed5a4510c/2017/10/file_example_PDF_1MB.pdf',
      fileSize: '3.9 MB',
      pages: 167,
      rating: 4.6,
      downloads: 523,
      views: 1589,
      likes: 167,
      uploadDate: '2024-01-01'
    }
  ];

  const branches = ['CSE', 'ECE', 'EEE', 'MECH', 'CIVIL'];
  const availableYears = selectedBranch ? ['1st Year', '2nd Year', '3rd Year', '4th Year'] : ['1st Year', '2nd Year', '3rd Year', '4th Year'];
  const availableSubjects = ['Mathematics', 'Physics', 'Chemistry', 'Programming', 'Electronics'];

  const filteredAndSortedNotes = useMemo(() => {
    let filtered = ALL_MOCK_NOTES.filter(note => {
      const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           note.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           note.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesBranch = !selectedBranch || note.branch === selectedBranch;
      const matchesYear = !selectedYear || note.year === selectedYear;
      const matchesSubject = !selectedSubject || note.subject === selectedSubject;
      return matchesSearch && matchesBranch && matchesYear && matchesSubject;
    });

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'latest':
          return new Date(b.uploadDate) - new Date(a.uploadDate);
        case 'oldest':
          return new Date(a.uploadDate) - new Date(b.uploadDate);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'author':
          return a.author.localeCompare(b.author);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'downloads':
          return (b.downloads || 0) - (a.downloads || 0);
        default:
          return 0;
      }
    });
  }, [searchQuery, selectedBranch, selectedYear, selectedSubject, sortBy]);

  const handleViewNote = (noteId) => {
    const note = ALL_MOCK_NOTES.find(n => n.id === noteId);
    if (note && note.previewUrl) {
      // Open preview in new tab
      window.open(note.previewUrl, '_blank');
    }
    console.log('Viewing note:', noteId);
  };

  const handleDownload = (noteId) => {
    const note = ALL_MOCK_NOTES.find(n => n.id === noteId);
    if (note && note.fileUrl) {
      // Create download link and trigger download
      const link = document.createElement('a');
      link.href = note.fileUrl;
      link.download = `${note.title.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    console.log('Downloading note:', noteId);
  };

  const handleNoteAction = (noteId, action, value) => {
    console.log(`Note ${noteId} ${action}:`, value);
    
    if (action === 'favorite') {
      // Add to favorites
      const note = ALL_MOCK_NOTES.find(n => n.id === noteId);
      if (note) {
        const favoritedNote = {
          ...note,
          favoritedDate: new Date().toISOString()
        };
        
        // Check if already in favorites
        const isAlreadyFavorited = favorites.some(fav => fav.id === noteId);
        if (!isAlreadyFavorited) {
          setFavorites(prev => [...prev, favoritedNote]);
          alert('Note added to favorites!');
        } else {
          alert('Note is already in favorites!');
        }
      }
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedBranch('');
    setSelectedYear('');
    setSelectedSubject('');
    setSortBy('latest');
  };

  const isFavorited = (noteId) => {
    return favorites.some(fav => fav.id === noteId);
  };

  return (
    <div className="browse-page">
      <div className="browse-header">
        <h1>Browse Notes</h1>
        <p>Discover and download study materials from your peers</p>
      </div>

      <div className="browse-controls">
        <div className="search-filter-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search notes by title, author, or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-dropdowns">
            <select
              value={selectedBranch}
              onChange={(e) => {
                setSelectedBranch(e.target.value);
                setSelectedYear('');
                setSelectedSubject('');
              }}
              className="filter-select"
            >
              <option value="">All Branches</option>
              {branches.map(branch => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>

            <select
              value={selectedYear}
              onChange={(e) => {
                setSelectedYear(e.target.value);
                setSelectedSubject('');
              }}
              className="filter-select"
              disabled={!selectedBranch}
            >
              <option value="">All Years</option>
              {availableYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="filter-select"
              disabled={!selectedBranch || !selectedYear}
            >
              <option value="">All Subjects</option>
              {availableSubjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title">Title (A-Z)</option>
              <option value="author">Author (A-Z)</option>
              <option value="rating">Highest Rated</option>
              <option value="downloads">Most Downloaded</option>
            </select>
          </div>
        </div>

        <div className="view-controls">
          <button
            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            Grid
          </button>
          <button
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            List
          </button>
        </div>
      </div>

      <div className="results-header">
        <div className="results-info">
          <h2>{filteredAndSortedNotes.length} Note{filteredAndSortedNotes.length !== 1 ? 's' : ''} Found</h2>
          <p>Showing all available notes</p>
        </div>
      </div>

      {filteredAndSortedNotes.length > 0 ? (
        <div className={`notes-container ${viewMode}`}>
          {filteredAndSortedNotes.map(note => (
            <div key={note.id} className="note-card" style={{
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '1rem',
              backgroundColor: 'white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}>
              <div style={{ marginBottom: '1rem' }}>
                <img 
                  src={note.thumbnail} 
                  alt={note.title}
                  style={{ 
                    width: '100%', 
                    height: '150px', 
                    objectFit: 'cover',
                    borderRadius: '4px'
                  }}
                />
              </div>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: '#1f2937' }}>{note.title}</h3>
              <p style={{ margin: '0 0 0.5rem 0', color: '#6b7280', fontSize: '0.9rem' }}>{note.description}</p>
              <p style={{ margin: '0 0 0.5rem 0', color: '#374151', fontSize: '0.8rem' }}><strong>Author:</strong> {note.author}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>{note.fileSize} | {note.pages} pages</span>
                <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>Rating: {note.rating} | Downloads: {note.downloads}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <button 
                  onClick={() => handleViewNote(note.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  View
                </button>
                <button 
                  onClick={() => handleDownload(note.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  Download
                </button>
                <button 
                  onClick={() => handleNoteAction(note.id, 'favorite')}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: isFavorited(note.id) ? '#fbbf24' : '#f3f4f6',
                    color: isFavorited(note.id) ? '#92400e' : '#6b7280',
                    border: '1px solid #fbbf24',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}
                >
                  <span>{isFavorited(note.id) ? '★' : '☆'}</span>
                  {isFavorited(note.id) ? 'Favorited' : 'Add to Favorites'}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results">
          <h3>No notes found</h3>
          <p>Try adjusting your filters or search terms</p>
          <button onClick={clearFilters}>Reset Filters</button>
        </div>
      )}
    </div>
  );
};

export default BrowseNotes;
