import React from 'react';
import './FaceRecognition.css';
import {DATABASE_LINK} from '../../constants.js';


const FaceRecognition = (props) => {
  const { id, imageUrl, imageDetectionError, faceBoxes, onAvatarSubmit } = props;
  
  const updateAvatar = () => {

    // set and save new avatar in database
    fetch(`${DATABASE_LINK}/avatar`, {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: id,
        avatar: imageUrl
      })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Avatar link was saved in database: ', data);
        onAvatarSubmit(imageUrl);
    })
    .catch(console.log);
  }


  return (
    <div>
      {imageDetectionError && <p className='db center f4 dark-red'>{imageDetectionError}</p>}

        <div className='center-column ma'>
          <div className='relative center center-column mt2'>
            <img className='face-img shadow-2 mb3' src={imageUrl} id='input-image' alt={imageUrl ? 'User link' : ''}/>
            {
              faceBoxes.map((box, i) => {
              return (
                  <div 
                    className='bounding-box' 
                    key={i}
                    style={{
                      top: box.topRow, 
                      left: box.leftCol, 
                      bottom: box.bottomRow, 
                      right: box.rightCol
                    }}>
                  </div>
                );
              })
            }
          </div>
          {faceBoxes.length > 0 && 
            <button 
              onClick={updateAvatar}
              className='db code mb5 w-80 w-20-ns w-30-m grow f6 link ph3 pv2 white'>Set as avatar
            </button>}
        </div>
    </div>
  );
}

export default FaceRecognition;