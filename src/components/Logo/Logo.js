import React from 'react';
import Tilt from 'react-tilt';
import eye from './eye.png';
import './Logo.css';

const Logo = (props) => {
  return (
    <div>
      <Tilt className="Tilt br2 shadow-2" options={{ max : 65 }}>
        <div className="Tilt-inner pa2">
          <img
          // add callback to prevent 'Maximum update depth exceeded error'
            onClick={() => props.isSignedIn ? props.onRouteChange('home') : props.onRouteChange('signin')}
            className="logo"
            alt='App logo'
            src={eye}/>
        </div>
      </Tilt>
    </div>
  );
}

export default Logo;