import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = () => {
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img id='inputimage' alt='' width='500px' heigh='auto'/>
        <div className='bounding-box'></div>
      </div>
    </div>
  );
}

export default FaceRecognition;