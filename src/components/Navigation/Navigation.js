import React from 'react';
import './Navigation.css';

const Navigation = (props) => {
  let changingLink;

  if (props.isSignedIn) {
    changingLink = props.route === 'profile' ? 
        <p onClick={() => props.onRouteChange('home')} className='f5 dib link bg-navy dim br2 pa3 pointer br--left mr2'>Home</p>
        : 
        <p onClick={() => props.onRouteChange('profile')} className='f5 dib link bg-navy dim br2 pa3 pointer br--left mr2'>Profile</p>;
    

    return (
      <nav 
        className='pl3 pl4-ns center-row' 
        style={{paddingTop: '3%', justifyContent: 'space-between'}}>
          {props.children}

          <div className='mt3 mt0-ns'>
            {changingLink}
            <p onClick={() => props.onRouteChange('signin')} className='f5 dib link bg-navy dim pa3 pointer'>Signout</p>
          </div> 
      </nav>
  
    );
  } else {
    return (
      <nav 
        className='pl3 pl4-ns center-row' 
        style={{ paddingTop: '3%', justifyContent: 'space-between'}}>
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