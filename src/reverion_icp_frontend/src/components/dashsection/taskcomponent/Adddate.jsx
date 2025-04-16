import React, { useState, useRef, useEffect } from 'react';

const Adddate = ({ onDateChange, initialDate }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(initialDate || '');
  const [activeTab, setActiveTab] = useState('due');
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [showRecurring, setShowRecurring] = useState(false);
  const [recurringFrequency, setRecurringFrequency] = useState('Weekly');
  const [recurringEndType, setRecurringEndType] = useState('When closed');
  const [createNewTask, setCreateNewTask] = useState(false);
  const [recurForever, setRecurForever] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showFrequencyDropdown, setShowFrequencyDropdown] = useState(false);
  const [showEndTypeDropdown, setShowEndTypeDropdown] = useState(false);
  
  const dateButtonRef = useRef(null);
  const datePickerRef = useRef(null);
  const frequencyDropdownRef = useRef(null);
  const endTypeDropdownRef = useRef(null);

  // Position the dropdown when it becomes visible
  const updatePosition = () => {
    if (dateButtonRef.current && showDatePicker) {
      const buttonRect = dateButtonRef.current.getBoundingClientRect();
      const pickerWidth = 520;
      const spaceBelow = window.innerHeight - buttonRect.bottom;
      const spaceRight = window.innerWidth - buttonRect.left;
      
      let top = buttonRect.bottom + 5;
      let left = buttonRect.left;
      
      // If the dropdown would go below the viewport, position it above the button
      if (spaceBelow < 400) {
        top = Math.max(5, buttonRect.top - 400);
      }
      
      // If the dropdown would go off the right edge, align it with the right edge of the button
      if (spaceRight < pickerWidth) {
        left = Math.max(5, buttonRect.right - pickerWidth);
      }
      
      setDropdownPosition({ top, left });
    }
  };

  // Update position when dropdown is shown
  useEffect(() => {
    if (showDatePicker) {
      updatePosition();
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition);
    }
    
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [showDatePicker]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      // Main date picker
      if (
        datePickerRef.current && 
        !datePickerRef.current.contains(event.target) &&
        dateButtonRef.current &&
        !dateButtonRef.current.contains(event.target)
      ) {
        setShowDatePicker(false);
        setShowRecurring(false);
      }
      
      // Frequency dropdown
      if (
        frequencyDropdownRef.current && 
        !frequencyDropdownRef.current.contains(event.target)
      ) {
        setShowFrequencyDropdown(false);
      }
      
      // End type dropdown
      if (
        endTypeDropdownRef.current && 
        !endTypeDropdownRef.current.contains(event.target)
      ) {
        setShowEndTypeDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Generate calendar days for current month/year
  const generateCalendarDays = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    
    // Get previous month's last days to fill the beginning of the calendar
    const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
    
    const days = [];
    
    // Add days from previous month (with other-month-day class)
    for (let i = 0; i < firstDayOfMonth; i++) {
      const dayNumber = prevMonthLastDay - firstDayOfMonth + i + 1;
      days.push({ 
        day: dayNumber, 
        empty: false,
        otherMonth: true,
        date: new Date(currentMonth === 0 ? currentYear - 1 : currentYear, currentMonth === 0 ? 11 : currentMonth - 1, dayNumber)
      });
    }
    
    // Add days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      const isCurrentDay = 
        date.getDate() === new Date().getDate() && 
        date.getMonth() === new Date().getMonth() && 
        date.getFullYear() === new Date().getFullYear();
      
      days.push({ 
        day: i, 
        date, 
        isCurrentDay,
        otherMonth: false,
        isSelected: selectedDate === formatDate(date)
      });
    }
    
    // Add days from next month if needed to fill a 6-row calendar
    const totalDaysFilled = days.length;
    const daysNeeded = 42 - totalDaysFilled; // 6 rows of 7 days
    
    for (let i = 1; i <= daysNeeded; i++) {
      days.push({ 
        day: i, 
        empty: false,
        otherMonth: true,
        date: new Date(currentMonth === 11 ? currentYear + 1 : currentYear, currentMonth === 11 ? 0 : currentMonth + 1, i)
      });
    }
    
    return days;
  };

  // Format date as string
  const formatDate = (date) => {
    if (!date) return '';
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Get day of week (short form) from date
  const getDayOfWeek = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
  };

  // Handle preset date selection
  const handlePresetSelect = (preset) => {
    if (preset === 'recurring') {
      setShowRecurring(true);
      return;
    }
    
    let date;
    const today = new Date();
    
    switch (preset) {
      case 'today':
        date = today;
        break;
      case 'later':
        date = new Date(today);
        date.setHours(today.getHours() + 4);
        break;
      case 'tomorrow':
        date = new Date(today);
        date.setDate(date.getDate() + 1);
        break;
      case 'weekend':
        date = new Date(today);
        // Find next Saturday
        date.setDate(date.getDate() + (6 - date.getDay()));
        break;
      case 'nextWeek':
        date = new Date(today);
        date.setDate(date.getDate() + 7);
        break;
      case 'nextWeekend':
        date = new Date(today);
        // Add days until next weekend after this one
        date.setDate(date.getDate() + (13 - date.getDay()) % 7);
        break;
      case 'twoWeeks':
        date = new Date(today);
        date.setDate(date.getDate() + 14);
        break;
      case 'fourWeeks':
        date = new Date(today);
        date.setDate(date.getDate() + 28);
        break;
      default:
        date = null;
    }
    
    if (date) {
      setSelectedDate(formatDate(date));
      onDateChange(formatDate(date));
      setShowDatePicker(false);
    }
  };

  // Handle save recurring settings
  const handleSaveRecurring = () => {
    // Here you would typically save the recurring settings
    // For now, we'll just set the selected date with a recurring indicator
    const recurringText = `${formatDate(new Date())} (${recurringFrequency})`;
    setSelectedDate(recurringText);
    onDateChange(recurringText);
    setShowDatePicker(false);
    setShowRecurring(false);
  };

  // Handle calendar day selection
  const handleDaySelect = (day) => {
    if (day.empty) return;
    
    setSelectedDate(formatDate(day.date));
    onDateChange(formatDate(day.date));
    
    // Update month/year if clicking on a day from another month
    if (day.otherMonth) {
      setCurrentMonth(day.date.getMonth());
      setCurrentYear(day.date.getFullYear());
    }
    
    // Don't close the picker if we're in recurring mode
    if (!showRecurring) {
      setShowDatePicker(false);
    }
  };

  // Navigate to previous month
  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // Navigate to next month
  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Go to today
  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
  };

  // Format month and year for display
  const formatMonthYear = () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${months[currentMonth]} ${currentYear}`;
  };

  // Handle frequency selection
  const handleFrequencySelect = (frequency) => {
    setRecurringFrequency(frequency);
    setShowFrequencyDropdown(false);
  };

  // Handle end type selection
  const handleEndTypeSelect = (endType) => {
    setRecurringEndType(endType);
    setShowEndTypeDropdown(false);
  };

  // Render preset date options
  const renderDatePresets = () => (
    <div className="due-date-presets">
      {!showRecurring && (
        <>
          {searchValue && (
            <div className="due-date-search-results">
              <div className="due-date-preset">
                <span>No results for "{searchValue}"</span>
              </div>
            </div>
          )}
          
          {!searchValue && (
            <>
              <div 
                className="due-date-preset" 
                onClick={() => handlePresetSelect('today')}
              >
                <span>Today</span>
                <span className="due-date-day">{getDayOfWeek(new Date())}</span>
              </div>
              <div 
                className="due-date-preset"
                onClick={() => handlePresetSelect('later')}
              >
                <span>Later</span>
                <span className="due-date-day">
                  {new Date().getHours() + 4 > 12 ? new Date().getHours() + 4 - 12 : new Date().getHours() + 4}:
                  {String(new Date().getMinutes()).padStart(2, '0')} 
                  {new Date().getHours() + 4 >= 12 ? 'pm' : 'am'}
                </span>
              </div>
              <div 
                className="due-date-preset"
                onClick={() => handlePresetSelect('tomorrow')}
              >
                <span>Tomorrow</span>
                <span className="due-date-day">
                  {getDayOfWeek(new Date(new Date().setDate(new Date().getDate() + 1)))}
                </span>
              </div>
              <div 
                className="due-date-preset"
                onClick={() => handlePresetSelect('weekend')}
              >
                <span>This weekend</span>
                <span className="due-date-day">Sat</span>
              </div>
              <div 
                className="due-date-preset"
                onClick={() => handlePresetSelect('nextWeek')}
              >
                <span>Next week</span>
                <span className="due-date-day">Mon</span>
              </div>
              <div 
                className="due-date-preset"
                onClick={() => handlePresetSelect('nextWeekend')}
              >
                <span>Next weekend</span>
                <span className="due-date-day">
                  {new Date().getDay() === 6 || new Date().getDay() === 0 ? "Next Sat" : "12 Apr"}
                </span>
              </div>
              <div 
                className="due-date-preset"
                onClick={() => handlePresetSelect('twoWeeks')}
              >
                <span>2 weeks</span>
                <span className="due-date-day">17 Apr</span>
              </div>
              <div 
                className="due-date-preset"
                onClick={() => handlePresetSelect('fourWeeks')}
              >
                <span>4 weeks</span>
                <span className="due-date-day">1 May</span>
              </div>
              <div 
                className="due-date-preset due-date-preset-recurring"
                onClick={() => handlePresetSelect('recurring')}
              >
                <span>Set Recurring</span>
                <span className="due-date-recurring">›</span>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );

  // Render recurring options and calendar side by side
  const renderRecurringPanel = () => (
    <div className="due-date-recurring-panel">
      <div className="due-date-recurring-options">
        <div className="due-date-recurring-header">
          <span>Recurring</span>
          <div className="due-date-recurring-actions">
            <span className="due-date-recurring-refresh">↻</span>
            <span className="due-date-recurring-menu">⋯</span>
          </div>
        </div>
        
        <div className="due-date-recurring-selector">
          <div 
            className="due-date-dropdown-button"
            onClick={() => setShowFrequencyDropdown(!showFrequencyDropdown)}
          >
            {recurringFrequency} <span className="dropdown-arrow">▼</span>
            
            {showFrequencyDropdown && (
              <div className="dropdown-options" ref={frequencyDropdownRef}>
                <div 
                  className={`dropdown-option ${recurringFrequency === 'Daily' ? 'selected' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFrequencySelect('Daily');
                  }}
                >
                  Daily
                  {recurringFrequency === 'Daily' && <span className="dropdown-check">✓</span>}
                </div>
                <div 
                  className={`dropdown-option ${recurringFrequency === 'Weekly' ? 'selected' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFrequencySelect('Weekly');
                  }}
                >
                  Weekly
                  {recurringFrequency === 'Weekly' && <span className="dropdown-check">✓</span>}
                </div>
                <div 
                  className={`dropdown-option ${recurringFrequency === 'Monthly' ? 'selected' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFrequencySelect('Monthly');
                  }}
                >
                  Monthly
                  {recurringFrequency === 'Monthly' && <span className="dropdown-check">✓</span>}
                </div>
                <div 
                  className={`dropdown-option ${recurringFrequency === 'Yearly' ? 'selected' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFrequencySelect('Yearly');
                  }}
                >
                  Yearly
                  {recurringFrequency === 'Yearly' && <span className="dropdown-check">✓</span>}
                </div>
                <div 
                  className={`dropdown-option ${recurringFrequency === 'Days after...' ? 'selected' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFrequencySelect('Days after...');
                  }}
                >
                  Days after...
                  {recurringFrequency === 'Days after...' && <span className="dropdown-check">✓</span>}
                </div>
                <div 
                  className={`dropdown-option ${recurringFrequency === 'Custom...' ? 'selected' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFrequencySelect('Custom...');
                  }}
                >
                  Custom...
                  {recurringFrequency === 'Custom...' && <span className="dropdown-check">✓</span>}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="due-date-recurring-selector">
          <div 
            className="due-date-dropdown-button"
            onClick={() => setShowEndTypeDropdown(!showEndTypeDropdown)}
          >
            {recurringEndType} <span className="dropdown-arrow">▼</span>
            
            {showEndTypeDropdown && (
              <div className="dropdown-options" ref={endTypeDropdownRef}>
                <div 
                  className={`dropdown-option ${recurringEndType === 'When closed' ? 'selected' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEndTypeSelect('When closed');
                  }}
                >
                  When closed
                  {recurringEndType === 'When closed' && <span className="dropdown-check">✓</span>}
                </div>
                <div 
                  className={`dropdown-option ${recurringEndType === 'When done' ? 'selected' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEndTypeSelect('When done');
                  }}
                >
                  When done
                  {recurringEndType === 'When done' && <span className="dropdown-check">✓</span>}
                </div>
                <div 
                  className={`dropdown-option ${recurringEndType === 'On schedule' ? 'selected' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEndTypeSelect('On schedule');
                  }}
                >
                  On schedule
                  {recurringEndType === 'On schedule' && <span className="dropdown-check">✓</span>}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="due-date-recurring-checkbox">
          <label>
            <input 
              type="checkbox" 
              checked={createNewTask}
              onChange={() => setCreateNewTask(!createNewTask)}
            />
            Create new task
          </label>
        </div>
        
        <div className="due-date-recurring-checkbox recur-forever">
          <label>
            <input 
              type="checkbox" 
              checked={recurForever}
              onChange={() => setRecurForever(!recurForever)}
              className="recur-forever-checkbox"
            />
            Recur forever
          </label>
        </div>
        
        <div className="due-date-recurring-footer">
          <button 
            className="due-date-recurring-cancel"
            onClick={() => setShowRecurring(false)}
          >
            Cancel
          </button>
          <button 
            className="due-date-recurring-save"
            onClick={handleSaveRecurring}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );

  // Render calendar panel
  const renderCalendarPanel = () => (
    <div className="due-date-calendar">
      <div className="due-date-calendar-header">
        <div className="month-year-display">
          {formatMonthYear()}
        </div>
        
        <div className="calendar-today-selector">
          <span 
            className="today-text"
            onClick={goToToday}
          >
            Today
          </span>
          
          <div className="calendar-nav-arrows">
            <div 
              className="calendar-nav-arrow"
              onClick={goToPrevMonth}
            >
              ←
            </div>
            <div 
              className="calendar-nav-arrow"
              onClick={goToNextMonth}
            >
              →
            </div>
          </div>
        </div>
      </div>
      
      <div className="due-date-calendar-weekdays">
        <div>Su</div>
        <div>Mo</div>
        <div>Tu</div>
        <div>We</div>
        <div>Th</div>
        <div>Fr</div>
        <div>Sa</div>
      </div>
      
      <div className="due-date-calendar-days">
        {generateCalendarDays().map((day, index) => (
          <div 
            key={index}
            className={`due-date-calendar-day 
              ${day.empty ? 'empty-day' : ''} 
              ${day.isCurrentDay ? 'current-day' : ''}
              ${day.isSelected ? 'selected-day' : ''}
              ${day.otherMonth ? 'other-month-day' : ''}
            `}
            onClick={() => handleDaySelect(day)}
          >
            {day.day}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="date-picker-container">
      <button 
        className="task-option-btn"
        onClick={(e) => {
          e.stopPropagation();
          setShowDatePicker(!showDatePicker);
          if (!showDatePicker) {
            // Clear dropdowns when opening
            setShowFrequencyDropdown(false);
            setShowEndTypeDropdown(false);
            // Small delay to ensure component renders
            setTimeout(updatePosition, 0);
          }
        }}
        ref={dateButtonRef}
      >
        <span className="task-option-icon">📅</span>
        <span className="task-option-text">
          {selectedDate ? selectedDate : "Due date"}
        </span>
      </button>
      
      {showDatePicker && (
        <div 
          className="date-picker-dropdown" 
          ref={datePickerRef}
          style={{
            position: 'fixed',
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            zIndex: 9999,
          }}
        >
          <div className="due-date-picker">
            <div className="due-date-tabs">
              <div 
                className={`due-date-tab ${activeTab === 'start' ? 'active' : ''}`}
                onClick={() => setActiveTab('start')}
              >
                <span className="due-date-tab-icon">📅</span>
                Start date
              </div>
              <div 
                className={`due-date-tab ${activeTab === 'due' ? 'active' : ''}`}
                onClick={() => setActiveTab('due')}
              >
                <span className="due-date-tab-icon">📅</span>
                Due date
              </div>
            </div>
            
            {!showRecurring && (
              <div className="due-date-search">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
            )}
            
            <div className="date-picker-content">
              {!showRecurring ? renderDatePresets() : null}
              
              {showRecurring ? renderRecurringPanel() : null}
              
              {/* Always show calendar panel */}
              {renderCalendarPanel()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Adddate;