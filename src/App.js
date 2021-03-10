import './App.css';
import React, { useState } from 'react';

function App() {
  const myCounter = 999
  return (
    <div className="App">
      <p>My Counter</p>
      <span>{myCounter}</span>
    </div>
  );
}

export default App;
