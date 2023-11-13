import React, { useState } from 'react';

export default function Inst() {
  const [isNightMode, setIsNightMode] = useState(false);

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
