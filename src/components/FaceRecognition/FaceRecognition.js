import React from 'react';
import './FaceRecognition.css';
import {DATABASE_LINK} from '../../constants.js';


const FaceRecognition = (props) => {
  const { imageUrl, avatarUrl, faceBoxes, imageDetectionError } = props;
  
  const updateAvatar = () => {
    // if submitted image link and current avatar link are the same, do not proceed:
    if (imageUrl === avatarUrl) return;

    // else set and save new avatar in database
    fetch(`${DATABASE_LINK}/avatar`, {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: props.id,
        avatarUrl: props.imageUrl
      })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Avatar link was saved in database: ', data);
        props.onAvatarSubmit();
    })
    .catch(console.log);
  }

  // display image container only if image link was submitted:
  const containerDisplayState = imageUrl ? 'center-column' : 'dn';

  // display avatar button only if correct image was submitted:
  const buttonDisplayState = faceBoxes.length ? 'db' : 'dn';
  
  // display error only when error occurs:
  const errorDisplayState = imageDetectionError ? 'db' : 'dn';


  return (
    <div>
      <div>
          <p className={errorDisplayState + ' center f4 dark-red'}>{imageDetectionError}</p>
      </div>

      <div className={containerDisplayState + ' ma'}>
        <div className='relative center center-column mt2'>
          <img className='face-img shadow-2 mb3' src={imageUrl} id='input-image' alt='User link'/>
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
        <button 
            onClick={updateAvatar}
            className={buttonDisplayState + ' code mb5 w-80 w-20-ns w-30-m grow f6 link ph3 pv2 white'}>Set as avatar
          </button>
      </div>
    </div>
  );
}

export default FaceRecognition;