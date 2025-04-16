import React, { useState } from 'react';
import '../../../assets/dashcss/TaskButtons.css'; 

const TaskButtons = () => {
  // State to track which button is active
  const [activeButton, setActiveButton] = useState(null);

  // Toggle active state for clicked button
  const handleButtonClick = (buttonName) => {
    // If clicking the same button, deactivate it; otherwise, set as active
    setActiveButton(activeButton === buttonName ? null : buttonName);
  };

  return (
    <div className="task-button-row">
      <button 
        className={`task-button ${activeButton === 'progress' ? 'active' : ''}`}
        onClick={() => handleButtonClick('progress')}
      >
        IN PROGRESS
      </button>

      <button 
        className={`task-button ${activeButton === 'assignee' ? 'active' : ''}`}
        onClick={() => handleButtonClick('assignee')}
      >
        <span className="button-icon">👤</span> Assignee
      </button>

      <button 
        className={`task-button ${activeButton === 'duedate' ? 'active' : ''}`}
        onClick={() => handleButtonClick('duedate')}
      >
        <span className="button-icon">📅</span> Due date
      </button>

      <button 
        className={`task-button ${activeButton === 'priority' ? 'active' : ''}`}
        onClick={() => handleButtonClick('priority')}
      >
        <span className="button-icon">🎯</span> Priority
      </button>
    </div>
  );
};

export default TaskButtons;