import React, { useState, useEffect } from 'react';

const Inst = () => {
  const [isNightMode, setIsNightMode] = useState(() => {
    const savedMode = localStorage.getItem('isNightMode');
    return savedMode !== null ? JSON.parse(savedMode) : false;
  });

  const [textSize, setTextSize] = useState(() => {
    const savedSize = localStorage.getItem('textSize');
    return savedSize !== null ? parseInt(savedSize, 10) : 16; // Default text size is 16 if not stored
  });

  useEffect(() => {
    localStorage.setItem('isNightMode', JSON.stringify(isNightMode));
    localStorage.setItem('textSize', textSize.toString()); // Save text size to local storage
    document.body.style.fontSize = `${textSize}px`; // Apply the text size to the body element
  }, [isNightMode, textSize]);

  const toggleNightMode = () => {
    setIsNightMode(!isNightMode);
  };

  const increaseTextSize = () => {
    setTextSize(prevSize => prevSize + 2); // Increase text size by 2px
  };

  const decreaseTextSize = () => {
    setTextSize(prevSize => Math.max(prevSize - 2, 10)); // Decrease text size by 2px, with a minimum of 10px
  };

  return (
    <div id="ia" className={`instellingen-area ${isNightMode ? 'night-mode' : ''}`}>
      <h1 className="title">Instellingen</h1>
      <div className="instellingen-content">
        <p className="choice">Maak uw keuze:</p>
        <button onClick={decreaseTextSize}>Maak tekst kleiner</button>
        <button onClick={increaseTextSize}>Maak tekst groter</button>
      </div>
      <button onClick={toggleNightMode}>Nachtmodus switch</button>
    </div>
  );
};

export default Inst;
