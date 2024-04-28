import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css'; // Style file for AdminDashboard

const AdminDashboard = () => {
  const [subjects, setSubjects] = useState([
    { id: 1, name: 'Subject 1', videos: ['Video 1', 'Video 2', 'Video 3'] },
    { id: 2, name: 'Subject 2', videos: ['Video 4', 'Video 5', 'Video 6'] },
    { id: 3, name: 'Subject 3', videos: ['Video 7', 'Video 8', 'Video 9'] },
  ]);

  const [doubts, setDoubts] = useState([
    { id: 1, student: 'Student A', question: 'Question 1', reply: '' },
    { id: 2, student: 'Student B', question: 'Question 2', reply: '' },
    { id: 3, student: 'Student C', question: 'Question 3', reply: '' },
  ]);

  const [selectedDoubt, setSelectedDoubt] = useState(null);
  const [replyText, setReplyText] = useState('');

  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedVideos, setSelectedVideos] = useState({});
  const [newSubjectName, setNewSubjectName] = useState('');
  const [isAddSubjectModalOpen, setIsAddSubjectModalOpen] = useState(false);
  const [isUploadFormOpen, setIsUploadFormOpen] = useState(false);

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
    setSelectedVideos({});
  };

  const handleVideoSelect = (video, index) => {
    setSelectedVideos({ ...selectedVideos, [index]: video });
  };

  const handleAddSubject = () => {
    setIsAddSubjectModalOpen(true);
  };
  

  const handleCloseModal = () => {
    setIsAddSubjectModalOpen(false);
    setIsUploadFormOpen(false); // Close upload form if open
    setNewSubjectName('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSubjectId = subjects.length + 1;
    const newSubject = {
      id: newSubjectId,
      name: newSubjectName,
      videos: [],
    };
    setSubjects([...subjects, newSubject]);
    setIsAddSubjectModalOpen(false);
    setNewSubjectName('');
  };

  const handleDeleteSubject = (id) => {
    setSubjects(subjects.filter(subject => subject.id !== id));
    setSelectedSubject(null); // Reset selected subject
  };

  const handleAddVideo = () => {
    setIsUploadFormOpen(true);
  };

  const handleCloseUploadForm = () => {
    setIsUploadFormOpen(false);
  };

  const handleDeleteVideo = (subjectId, videoIndex) => {
    const updatedSubjects = subjects.map(subject =>
      subject.id === subjectId ? { ...subject, videos: subject.videos.filter((video, index) => index !== videoIndex) } : subject
    );
    setSubjects(updatedSubjects);
    setSelectedVideos({}); // Reset selected videos
  };

  const handleSelectDoubt = (doubt) => {
    setSelectedDoubt(doubt);
    setReplyText('');
  };

  const handleReply = () => {
    const updatedDoubts = doubts.map(doubt =>
      doubt.id === selectedDoubt.id ? { ...doubt, reply: replyText } : doubt
    );
    setDoubts(updatedDoubts);
    setReplyText('');
  };

  const handleCloseReply = () => {
    setSelectedDoubt(null);
    setReplyText('');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <div className="dashboard-buttons">
          <Link to="/inbox" className="dashboard-button">Inbox</Link>
          <button className="dashboard-button add-subject-button" onClick={handleAddSubject}>Add Subject</button>
          {selectedSubject && (
            <button className="dashboard-button delete-subject-button" onClick={() => handleDeleteSubject(selectedSubject.id)}>Delete Subject</button>
          )}
          
        </div>
      </header>
      <div className="main-container">
        <div className="sidebar">
          <h3>Subjects</h3>
          <ul className="subject-list">
            {subjects.map(subject => (
              <li key={subject.id}>
                <button className="subject-button" onClick={() => handleSubjectClick(subject)}>{subject.name}</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="main-content">
          <h3>Main Content</h3>
          {selectedSubject && (
            <>
              <h4>Videos for {selectedSubject.name}</h4>
              <ul className="subject-list">
                {selectedSubject.videos.map((video, index) => (
                  <li key={index}>
                    <button className="dropdown-button" onClick={() => handleVideoSelect(video, index)}>{video}</button>
                    <button className="delete-button" onClick={() => handleDeleteVideo(selectedSubject.id, index)}>Delete</button>
                  </li>
                ))}
              </ul>
              <div className="upload-delete-buttons">
                <button className="upload-button" onClick={handleAddVideo}>Upload Video</button>
              </div>
              {isUploadFormOpen && (
                <div className="upload-form">
                  <span className="close" onClick={handleCloseUploadForm}>&times;</span>
                  <h4>Upload Video</h4>
                  <form>
                    <label>
                      Title:
                      <input type="text" />
                    </label>
                    <label>
                      Add Link:
                      <input type="text" />
                    </label>
                    <label>
                      Drag and Drop Video:
                      <input type="file" />
                    </label>
                    <button type="submit">Upload</button>
                  </form>
                </div>
              )}
            </>
          )}
          <h3>Inbox</h3>
          <ul className="doubts-list">
            {doubts.map(doubt => (
              <li key={doubt.id}>
                <div className="doubt-item" onClick={() => handleSelectDoubt(doubt)}>
                  <div className="student">{doubt.student}</div>
                  <div className="question">{doubt.question}</div>
                  {doubt.reply && <div className="reply">{doubt.reply}</div>}
                </div>
                {selectedDoubt && selectedDoubt.id === doubt.id && (
                  <div className="reply-section">
                    <textarea
                      className="reply-textarea"
                      placeholder="Type your reply here..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    ></textarea>
                    <button className="reply-button" onClick={handleReply}>Reply</button>
                    <button className="close-button" onClick={handleCloseReply}>Close</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {isAddSubjectModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <form onSubmit={handleSubmit}>
              <label>
                Subject Name:
                <input type="text" value={newSubjectName} onChange={(e) => setNewSubjectName(e.target.value)} />
              </label>
              <button type="submit">Add Subject</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
