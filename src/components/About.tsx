import React from 'react';

const About = () => {
  return (
    <div>
      <h1>About Page</h1>
      <button onClick={() => window.location.href = '/movies-at-2114'}>Go to Home</button>
    </div>
  );
};

export default About;
