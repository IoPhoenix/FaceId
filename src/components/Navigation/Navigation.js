import React from 'react';
import './Navigation.css';

const Navigation = (props, {onRouteChange, isSignedIn}) => {

  if (props.isSignedIn) {
    return (
      <nav 
        className='pl3 pl4-ns' 
        style={{paddingTop: '3%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          {props.children}
          <div className='mt3 mt0-ns'>
            <p onClick={() => props.onRouteChange('signin')} className='f5 dib link bg-navy dim pa3 pointer'>Sign Out</p>
          </div>
      </nav>
    );
  } else {
    return (
      <nav 
        className='pl3 pl4-ns' 
        style={{ paddingTop: '3%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          {props.children}
          <div className='mt3 mt0-ns'>
            <p onClick={() => props.onRouteChange('signin')} className='f5 dib link bg-navy dim br2 pa3 pointer br--left mr2'>Sign In</p>
            <p onClick={() => props.onRouteChange('register')} className='f5 dib link bg-navy dim pa3 pointer'>Register</p>
          </div>
      </nav>
    );
  }
}

export default Navigation;