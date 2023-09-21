import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/about">Go to About</Link>
      <br />
      <Link to="/drive-login">Login to Google Drive</Link> {/* Add this line */}
    </div>
  );
};

export default Home;
