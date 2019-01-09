import React from 'react';
import user from './user.png';

const Avatar = (props) => {
  return (
      <img 
        onClick={() => props.onRouteChange('profile')}
        style={{objectFit: 'cover', backgroundColor: '#001B43'}}
        className="ba dib mb3 center br2 shadow-4 pointer dim"
        src={props.avatarUrl ? props.avatarUrl : user}
        width="100"
        height="100"
        alt="User avatar"
        title="Click to see your profile" 
      />
  )
}

export default Avatar;