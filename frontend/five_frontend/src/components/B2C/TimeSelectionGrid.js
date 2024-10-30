import React, { useState, useEffect } from 'react';
import "../../styles/TimeSelectionGrid.css";

const TimeSelectionGrid = ({ availability, setAvailability }) => {
  const daysOfWeek = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
  const hours = Array.from({ length: 16 }, (_, i) => i + 6); // Hours from 6 to 21

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [selectionMode, setSelectionMode] = useState(null); // 'select' or 'deselect'

  const handleMouseDown = (day, hour) => (e) => {
    e.preventDefault();
    setIsMouseDown(true);
    const isSelected = availability[day].includes(hour);
    setSelectionMode(isSelected ? 'deselect' : 'select');
    toggleHour(day, hour);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    setSelectionMode(null);
  };

  const handleMouseEnter = (day, hour) => (e) => {
    e.preventDefault();
    if (isMouseDown) {
      toggleHour(day, hour);
    }
  };

  const toggleHour = (day, hour) => {
    setAvailability((prevAvailability) => {
      const dayHours = prevAvailability[day];
      let newDayHours;
      if (selectionMode === 'select') {
        if (!dayHours.includes(hour)) {
          newDayHours = [...dayHours, hour];
        } else {
          newDayHours = dayHours;
        }
      } else if (selectionMode === 'deselect') {
        newDayHours = dayHours.filter((h) => h !== hour);
      } else {
        if (dayHours.includes(hour)) {
          newDayHours = dayHours.filter((h) => h !== hour);
        } else {
          newDayHours = [...dayHours, hour];
        }
      }
    
      const newAvailability = {
        ...prevAvailability,
        [day]: newDayHours.sort((a, b) => a - b),
      };
      
      localStorage.setItem("availability", JSON.stringify(newAvailability));
      console.log(JSON.stringify(newAvailability));
      return newAvailability;
    });
  };

  useEffect(() => {
    // Handle mouse up event globally
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Function to determine if a cell is the start or end of a selection group
  const getCellClass = (day, hour) => {
    const isSelected = availability[day].includes(hour);
    if (!isSelected) return '';

    const dayHours = availability[day].sort((a, b) => a - b);
    const index = dayHours.indexOf(hour);

    const isFirst = index === 0 || dayHours[index - 1] !== hour - 1;
    const isLast = index === dayHours.length - 1 || dayHours[index + 1] !== hour + 1;

    if (isFirst && isLast) {
      return 'selected selected-start selected-end';
    } else if (isFirst) {
      return 'selected selected-start';
    } else if (isLast) {
      return 'selected selected-end';
    } else {
      return 'selected';
    }
  };

  return (
    <div className="time-selection-grid">
      <div className="grid-header">
        <div className="grid-cell header-cell"></div>
        {daysOfWeek.map((day) => (
          <div key={day} className="grid-cell header-cell">
            {day}
          </div>
        ))}
      </div>
      {hours.map((hour) => (
        <div key={hour} className="grid-row">
          <div className="grid-cell header-cell">{hour}:00</div>
          {daysOfWeek.map((day) => {
            const cellClass = getCellClass(day, hour);
            return (
              <div
                key={`${day}-${hour}`}
                className={`grid-cell ${cellClass}`}
                onMouseDown={handleMouseDown(day, hour)}
                onMouseEnter={handleMouseEnter(day, hour)}
              ></div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default TimeSelectionGrid;
