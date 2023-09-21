import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import DriveLogin from './components/DriveLogin'; // Import the Google Drive login component
import DriveContent from './components/DriveContent'; // Import the Google Drive content component

function App() {
  const [accessToken, setAccessToken] = useState('');

  const handleDriveLogin = (token: string) => {
    setAccessToken(token);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/drive-login" element={<DriveLogin onSuccess={handleDriveLogin} />} />
        <Route
          path="/drive-content"
          element={accessToken ? <DriveContent accessToken={accessToken} /> : <DriveLogin onSuccess={handleDriveLogin} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
