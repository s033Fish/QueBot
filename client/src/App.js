import React from 'react';
import './App.css';
import UploadAndProcess from './components/UploadAndProcess';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Music Voice Cloning Service</h1>
      </header>
      <UploadAndProcess />
    </div>
  );
}

export default App;
