import React from 'react';
import '../css/LoadingAnimation.css';

const LoadingAnimation = () => {
  return (
    <div className="loading-container">
      <div className="film-reel">
        <div className="reel-circle outer-circle">
          <div className="sprocket-hole"></div>
          <div className="sprocket-hole"></div>
          <div className="sprocket-hole"></div>
          <div className="sprocket-hole"></div>
          <div className="sprocket-hole"></div>
          <div className="sprocket-hole"></div>
          <div className="sprocket-hole"></div>
          <div className="sprocket-hole"></div>
        </div>
        <div className="reel-circle inner-circle"></div>
      </div>
      <p className="loading-text">Loading...</p>
    </div>
  );
};

export default LoadingAnimation;