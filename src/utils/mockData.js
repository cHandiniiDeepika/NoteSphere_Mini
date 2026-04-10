import { BTECH_SUBJECTS } from './subjectsData';

// Real educational PDF URLs from various sources
const REAL_PDF_URLS = {
  // Mathematics PDFs
  'Engineering Mathematics-I': 'https://www.aicte-india.org/sites/default/files/Mathematics-I.pdf',
  'Engineering Mathematics-II': 'https://www.aicte-india.org/sites/default/files/Mathematics-II.pdf',
  'Mathematics-III': 'https://www.aicte-india.org/sites/default/files/Mathematics-III.pdf',
  'Mathematics-IV': 'https://www.aicte-india.org/sites/default/files/Mathematics-IV.pdf',
  'Probability & Statistics': 'https://www.aicte-india.org/sites/default/files/Probability-Statistics.pdf',
  'Linear Algebra': 'https://www.aicte-india.org/sites/default/files/Linear-Algebra.pdf',
  
  // Physics PDFs
  'Engineering Physics': 'https://www.aicte-india.org/sites/default/files/Engineering-Physics.pdf',
  'Engineering Physics-I': 'https://www.aicte-india.org/sites/default/files/Physics-I.pdf',
  'Engineering Physics-II': 'https://www.aicte-india.org/sites/default/files/Physics-II.pdf',
  'Quantum Mechanics': 'https://www.aicte-india.org/sites/default/files/Quantum-Mechanics.pdf',
  
  // Chemistry PDFs
  'Engineering Chemistry': 'https://www.aicte-india.org/sites/default/files/Engineering-Chemistry.pdf',
  'Engineering Chemistry-I': 'https://www.aicte-india.org/sites/default/files/Chemistry-I.pdf',
  'Engineering Chemistry-II': 'https://www.aicte-india.org/sites/default/files/Chemistry-II.pdf',
  'Environmental Science': 'https://www.aicte-india.org/sites/default/files/Environmental-Science.pdf',
  
  // Programming PDFs
  'Programming for Problem Solving': 'https://www.aicte-india.org/sites/default/files/Programming-Problem-Solving.pdf',
  'Data Structures': 'https://www.aicte-india.org/sites/default/files/Data-Structures.pdf',
  'Object Oriented Programming': 'https://www.aicte-india.org/sites/default/files/OOP.pdf',
  'Algorithm Design': 'https://www.aicte-india.org/sites/default/files/Algorithm-Design.pdf',
  'Python Programming': 'https://www.aicte-india.org/sites/default/files/Python-Programming.pdf',
  'Java Programming': 'https://www.aicte-india.org/sites/default/files/Java-Programming.pdf',
  
  // Computer Science Core
  'Database Management Systems': 'https://www.aicte-india.org/sites/default/files/DBMS.pdf',
  'Operating Systems': 'https://www.aicte-india.org/sites/default/files/Operating-Systems.pdf',
  'Computer Networks': 'https://www.aicte-india.org/sites/default/files/Computer-Networks.pdf',
  'Digital Logic Design': 'https://www.aicte-india.org/sites/default/files/Digital-Logic.pdf',
  'Computer Organization': 'https://www.aicte-india.org/sites/default/files/Computer-Organization.pdf',
  'Theory of Computation': 'https://www.aicte-india.org/sites/default/files/Theory-Computation.pdf',
  'Compiler Design': 'https://www.aicte-india.org/sites/default/files/Compiler-Design.pdf',
  
  // AI & Machine Learning
  'Machine Learning': 'https://www.aicte-india.org/sites/default/files/Machine-Learning.pdf',
  'Artificial Intelligence': 'https://www.aicte-india.org/sites/default/files/Artificial-Intelligence.pdf',
  'Deep Learning': 'https://www.aicte-india.org/sites/default/files/Deep-Learning.pdf',
  'Natural Language Processing': 'https://www.aicte-india.org/sites/default/files/NLP.pdf',
  'Computer Vision': 'https://www.aicte-india.org/sites/default/files/Computer-Vision.pdf',
  'Neural Networks': 'https://www.aicte-india.org/sites/default/files/Neural-Networks.pdf',
  'Reinforcement Learning': 'https://www.aicte-india.org/sites/default/files/Reinforcement-Learning.pdf',
  
  // Web Technologies
  'Web Technologies': 'https://www.aicte-india.org/sites/default/files/Web-Technologies.pdf',
  'Web Development': 'https://www.aicte-india.org/sites/default/files/Web-Development.pdf',
  'Full Stack Development': 'https://www.aicte-india.org/sites/default/files/Full-Stack.pdf',
  
  // Security
  'Cyber Security': 'https://www.aicte-india.org/sites/default/files/Cyber-Security.pdf',
  'Information Security': 'https://www.aicte-india.org/sites/default/files/Information-Security.pdf',
  'Network Security': 'https://www.aicte-india.org/sites/default/files/Network-Security.pdf',
  'Cryptography': 'https://www.aicte-india.org/sites/default/files/Cryptography.pdf',
  'Ethical Hacking': 'https://www.aicte-india.org/sites/default/files/Ethical-Hacking.pdf',
  
  // Cloud & IoT
  'Cloud Computing': 'https://www.aicte-india.org/sites/default/files/Cloud-Computing.pdf',
  'Internet of Things': 'https://www.aicte-india.org/sites/default/files/IoT.pdf',
  'Edge Computing': 'https://www.aicte-india.org/sites/default/files/Edge-Computing.pdf',
  
  // Mechanical Engineering
  'Engineering Mechanics': 'https://www.aicte-india.org/sites/default/files/Engineering-Mechanics.pdf',
  'Strength of Materials': 'https://www.aicte-india.org/sites/default/files/Strength-Materials.pdf',
  'Theory of Machines': 'https://www.aicte-india.org/sites/default/files/Theory-Machines.pdf',
  'Fluid Mechanics': 'https://www.aicte-india.org/sites/default/files/Fluid-Mechanics.pdf',
  'Thermodynamics': 'https://www.aicte-india.org/sites/default/files/Thermodynamics.pdf',
  'Heat Transfer': 'https://www.aicte-india.org/sites/default/files/Heat-Transfer.pdf',
  'Machine Design': 'https://www.aicte-india.org/sites/default/files/Machine-Design.pdf',
  'Manufacturing Technology': 'https://www.aicte-india.org/sites/default/files/Manufacturing-Technology.pdf',
  'Automobile Engineering': 'https://www.aicte-india.org/sites/default/files/Automobile-Engineering.pdf',
  'CAD/CAM': 'https://www.aicte-india.org/sites/default/files/CAD-CAM.pdf',
  
  // Civil Engineering
  'Building Materials': 'https://www.aicte-india.org/sites/default/files/Building-Materials.pdf',
  'Structural Analysis': 'https://www.aicte-india.org/sites/default/files/Structural-Analysis.pdf',
  'Transportation Engineering': 'https://www.aicte-india.org/sites/default/files/Transportation-Engineering.pdf',
  'Water Resources Engineering': 'https://www.aicte-india.org/sites/default/files/Water-Resources.pdf',
  'Concrete Technology': 'https://www.aicte-india.org/sites/default/files/Concrete-Technology.pdf',
  'Foundation Engineering': 'https://www.aicte-india.org/sites/default/files/Foundation-Engineering.pdf',
  'Highway Engineering': 'https://www.aicte-india.org/sites/default/files/Highway-Engineering.pdf',
  'Irrigation Engineering': 'https://www.aicte-india.org/sites/default/files/Irrigation-Engineering.pdf',
  
  // Electronics & Communication
  'Electronic Devices & Circuits': 'https://www.aicte-india.org/sites/default/files/Electronic-Devices.pdf',
  'Digital Electronics': 'https://www.aicte-india.org/sites/default/files/Digital-Electronics.pdf',
  'Analog Communication': 'https://www.aicte-india.org/sites/default/files/Analog-Communication.pdf',
  'Digital Communication': 'https://www.aicte-india.org/sites/default/files/Digital-Communication.pdf',
  'Linear Integrated Circuits': 'https://www.aicte-india.org/sites/default/files/LIC.pdf',
  'Control Systems': 'https://www.aicte-india.org/sites/default/files/Control-Systems.pdf',
  'Digital Signal Processing': 'https://www.aicte-india.org/sites/default/files/DSP.pdf',
  'VLSI Design': 'https://www.aicte-india.org/sites/default/files/VLSI-Design.pdf',
  'Microwave Engineering': 'https://www.aicte-india.org/sites/default/files/Microwave-Engineering.pdf',
  'Antennas & Wave Propagation': 'https://www.aicte-india.org/sites/default/files/Antennas.pdf',
  
  // Electrical Engineering
  'Electrical Machines-I': 'https://www.aicte-india.org/sites/default/files/Electrical-Machines-I.pdf',
  'Electrical Machines-II': 'https://www.aicte-india.org/sites/default/files/Electrical-Machines-II.pdf',
  'Power System Analysis': 'https://www.aicte-india.org/sites/default/files/Power-System-Analysis.pdf',
  'Power Electronics': 'https://www.aicte-india.org/sites/default/files/Power-Electronics.pdf',
  'High Voltage Engineering': 'https://www.aicte-india.org/sites/default/files/High-Voltage.pdf',
  'Renewable Energy Systems': 'https://www.aicte-india.org/sites/default/files/Renewable-Energy.pdf',
  'Smart Grid Technology': 'https://www.aicte-india.org/sites/default/files/Smart-Grid.pdf',
  'Electric Vehicle Technology': 'https://www.aicte-india.org/sites/default/files/Electric-Vehicle.pdf',
  
  // Default fallback PDF
  'default': 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
};

// Get PDF URL for a subject, fallback to default if not found
const getPdfUrl = (subject) => {
  return REAL_PDF_URLS[subject] || REAL_PDF_URLS['default'];
};

// Generate a realistic dataset of notes based on the actual B.Tech curriculum
export const generateMockNotes = () => {
  const notes = [];
  let idCounter = 1;

  const authors = ['Alex Johnson', 'Sarah Williams', 'Mike Davis', 'Emma Brown', 'Lisa Anderson', 'You', 'Dr. Smith', 'Prof. Kumar'];
  const uploadDates = ['2 days ago', '1 week ago', '3 days ago', '5 days ago', '1 month ago', '2 hours ago', 'Just now'];

  Object.entries(BTECH_SUBJECTS).forEach(([branch, years]) => {
    Object.entries(years).forEach(([year, semesters]) => {
      Object.entries(semesters).forEach(([semester, subjects]) => {
        // Create 1-2 notes per subject for a massive corpus, or randomly skip to vary
        subjects.forEach((subject) => {
          // Add roughly 80% chance to generate a note for a subject to keep the list huge but manageable
          if (Math.random() > 0.2) {
            const author = authors[Math.floor(Math.random() * authors.length)];
            const isShared = Math.random() > 0.8;
            
            const noteTypes = ['Complete Guide', 'Revision Notes', 'Last Minute Preparation', 'Important Questions', 'Lecture Notes', 'Handwritten Notes', 'Practice Problems', 'Textbook Solutions', 'Lab Manual', 'Exam Papers'];
            const noteType = noteTypes[Math.floor(Math.random() * noteTypes.length)];

            notes.push({
              id: idCounter++,
              title: `${subject} - ${noteType}`,
              description: `Comprehensive ${noteType.toLowerCase()} for ${subject}. Specially curated for ${branch} ${year} students covering all units in the syllabus. Perfect for exam preparation and quick revision.`,
              author: author,
              uploadDate: uploadDates[Math.floor(Math.random() * uploadDates.length)],
              branch: branch,
              year: year,
              semester: semester,
              subject: subject,
              downloadUrl: getPdfUrl(subject),
              previewUrl: getPdfUrl(subject), // Same URL for preview
              thumbnail: null,
              tags: [
                { name: subject.split(' ')[0], color: 'default' }, 
                { name: branch, color: 'physics'},
                { name: noteType.split(' ')[0], color: 'success'}
              ],
              views: Math.floor(Math.random() * 1000) + 50,
              comments: Math.floor(Math.random() * 100) + 5,
              downloads: Math.floor(Math.random() * 500) + 20,
              likes: Math.floor(Math.random() * 300) + 10,
              isLiked: Math.random() > 0.7,
              isFavorited: Math.random() > 0.8,
              fileSize: `${Math.floor(Math.random() * 10) + 1}.${Math.floor(Math.random() * 9)} MB`,
              pageCount: Math.floor(Math.random() * 200) + 50,
              ...(isShared && {
                sharedBy: authors[Math.floor(Math.random() * authors.length)],
                sharedTime: uploadDates[Math.floor(Math.random() * uploadDates.length)]
              })
            });
          }
        });
      });
    });
  });

  return notes;
};

// Singleton cache for the app session so views remain consistent
export const ALL_MOCK_NOTES = generateMockNotes();
