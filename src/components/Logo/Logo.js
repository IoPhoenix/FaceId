import React from 'react';
import Tilt from 'react-tilt';
import eye from './eye.png';
import './Logo.css';

const Logo = ({onRouteChange, isSignedIn}) => {
  return (
    <div
      className='pointer'
      // user logo as home link only if the user is logged in:
      onClick={() => {
        if (isSignedIn) onRouteChange('home')}}>
      <Tilt className="Tilt br2 shadow-2" options={{ max : 65 }}>
        <div className="Tilt-inner pa2">
          <img
            className="logo"
            alt='App logo'
            src={eye}/>
        </div>
      </Tilt>
    </div>
  );
}

export default Logo;