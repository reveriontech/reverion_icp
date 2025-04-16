import React, { useRef, useState, useEffect } from 'react';
import '../../../assets/dashcss/task.css';

const Priority = ({ onPriorityChange, initialPriority = '' }) => {
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
  const priorityButtonRef = useRef(null);
  const priorityDropdownRef = useRef(null);
  const containerRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current && 
        !containerRef.current.contains(event.target)
      ) {
        setShowPriorityDropdown(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  // Handle priority selection
  const handlePriorityChange = (priority) => {
    onPriorityChange(priority);
    setShowPriorityDropdown(false);
  };
  
  // Get priority icon based on level
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'Urgent':
        return '🔴';
      case 'High':
        return '🟡';
      case 'Normal':
        return '🔵';
      case 'Low':
        return '⚪';
      default:
        return '🏳️';
    }
  };
  
  // Render the priority dropdown
  const renderPriorityDropdown = () => {
    return (
      <div className="priority-dropdown" ref={priorityDropdownRef}>
        <div className="priority-option" onClick={() => handlePriorityChange("Urgent")}>
          <span className="priority-flag priority-urgent">🔴</span>
          <span className="priority-label">Urgent</span>
        </div>
        <div className="priority-option" onClick={() => handlePriorityChange("High")}>
          <span className="priority-flag priority-high">🟡</span>
          <span className="priority-label">High</span>
        </div>
        <div className="priority-option" onClick={() => handlePriorityChange("Normal")}>
          <span className="priority-flag priority-normal">🔵</span>
          <span className="priority-label">Normal</span>
        </div>
        <div className="priority-option" onClick={() => handlePriorityChange("Low")}>
          <span className="priority-flag priority-low">⚪</span>
          <span className="priority-label">Low</span>
        </div>
        <div className="priority-option" onClick={() => handlePriorityChange("")}>
          <span className="priority-clear">⊘</span>
          <span className="priority-label">Clear</span>
        </div>
      </div>
    );
  };
  
  return (
    <div className="priority-container" ref={containerRef}>
      <button 
        className="task-option-btn"
        onClick={() => setShowPriorityDropdown(!showPriorityDropdown)}
        ref={priorityButtonRef}
      >
        <span className="task-option-icon">
          {getPriorityIcon(initialPriority)}
        </span>
        <span className="task-option-text">
          {initialPriority ? initialPriority : 'Priority'}
        </span>
      </button>
      {showPriorityDropdown && renderPriorityDropdown()}
    </div>
  );
};

export default Priority;