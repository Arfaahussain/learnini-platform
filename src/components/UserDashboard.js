import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UserDashboard.css';

const UserDashboard = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedVideos, setSelectedVideos] = useState({});

  // Sample video data for each subject
  const videoData = {
    subject1: ['Video 1', 'Video 2', 'Video 3'],
    subject2: ['Video 4', 'Video 5', 'Video 6'],
    subject3: ['Video 7', 'Video 8', 'Video 9'],
    subject4: ['Video 10', 'Video 11', 'Video 12'],
    subject5: ['Video 13', 'Video 14', 'Video 15'],
  };

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
    setSelectedVideos({});
  };

  const handleVideoSelect = (video, index) => {
    setSelectedVideos({ ...selectedVideos, [index]: video });
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>User Dashboard</h2>
        <div className="dashboard-buttons">
          <Link to="/dashboard" className="dashboard-button">Dashboard</Link>
          <Link to="/quiz" className="dashboard-button">Quiz</Link>
          <Link to="/assessment" className="dashboard-button">Assessment</Link>
          <Link to="/report" className="dashboard-button">Report</Link>
        </div>
      </header>
      <div className="main-container">
        <div className="sidebar">
          <h3>Subjects</h3>
          <ul className="subject-list">
            <li>
              <button className="subject-button" onClick={() => handleSubjectClick('subject1')}>Introduction to Data Structures and Algorithm</button>
            </li>
            <li>
              <button className="subject-button" onClick={() => handleSubjectClick('subject2')}>Web Development</button>
            </li>
            <li>
              <button className="subject-button" onClick={() => handleSubjectClick('subject3')}>Java Programming</button>
            </li>
            <li>
              <button className="subject-button" onClick={() => handleSubjectClick('subject4')}>Operating Systems</button>
            </li>
            <li>
              <button className="subject-button" onClick={() => handleSubjectClick('subject5')}>Computer Networks</button>
            </li>
          </ul>
        </div>
        <div className="main-content">
          <h3>Main Content</h3>
          {selectedSubject && (
            <div>
              <h4>Videos for {selectedSubject}</h4>
              <ul className="subject-list">
              <li>
                {/* First Dropdown */}
                <select className="dropdown-button" value={selectedVideos[selectedSubject] || ''} onChange={(e) => handleVideoSelect(e.target.value, selectedSubject)}>
                  <option value="">Select a video</option>
                  {videoData[selectedSubject].map((video, index) => (
                    <option key={index} value={video}>
                      {video}
                    </option>
                  ))}
                </select>
              </li><br></br>
              <li>
              {/* Second Dropdown */}
              <select className="dropdown-button" value={selectedVideos[selectedSubject] || ''} onChange={(e) => handleVideoSelect(e.target.value, selectedSubject)}>
                <option value="">Select a video</option>
                {videoData[selectedSubject].map((video, index) => (
                  <option key={index} value={video}>
                    {video}
                  </option>
                ))}
              </select>
              </li>
              <li><br></br>
              {/* Third Dropdown */}
              <select className="dropdown-button" value={selectedVideos[selectedSubject] || ''} onChange={(e) => handleVideoSelect(e.target.value, selectedSubject)}>
                <option value="">Select a video</option>
                {videoData[selectedSubject].map((video, index) => (
                  <option key={index} value={video}>
                    {video}
                  </option>
                ))}
              </select>
              </li>
              </ul>
              {selectedVideos[selectedSubject] && (
                <div>
                  {/* Embed YouTube video here */}
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${selectedVideos[selectedSubject]}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
