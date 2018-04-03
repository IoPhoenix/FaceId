import React from 'react';
import './Navigation.css';

const Navigation = (props) => {
    return (
      <nav className='pl4 pt4' style={{alignItems: 'center', display: 'flex', justifyContent: 'space-between'}}>
       {props.children}
        <p className='f4 link bg-navy dim br2 pa3 pointer'>Sign In</p>
      </nav>
    );
}

export default Navigation;