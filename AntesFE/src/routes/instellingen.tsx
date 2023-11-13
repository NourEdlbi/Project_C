import React, { useState, useEffect } from 'react';

export default function Inst() {
  const [isNightMode, setIsNightMode] = useState(() => {
    const savedMode = localStorage.getItem('isNightMode');
    return savedMode !== null ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem('isNightMode', JSON.stringify(isNightMode));
  }, [isNightMode]);

  const toggleNightMode = () => {
    setIsNightMode(!isNightMode);
  };

  return (
    <div className={`App ${isNightMode ? 'night-mode' : ''}`}>
      <h1>Instellingen</h1>
      <p>
        gndgjsdgls
        dklgnsdngs
        sdlkgnksdng
        nsdkgnksd;gn
      </p>
      <button onClick={toggleNightMode}>Toggle Night Mode</button>
    </div>
  );
}
