import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl}) => {
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img className='shadow-2' src={imageUrl} id='input-image' alt='' width='500px' heigh='auto'/>
        {/* <div className='bounding-box'></div> */}
      </div>
    </div>
  );
}

export default FaceRecognition;