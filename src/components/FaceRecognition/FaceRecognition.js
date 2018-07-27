import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = (props) => {
  const { imageUrl, avatarUrl, faceBoxes, imageDetectionError } = props;


  const updateAvatar = () => {
    // if submitted image link and current avatar link are the same, do no proceed:
    if (imageUrl === avatarUrl) return;

    // else set and save new avatar in database
    fetch('https://calm-forest-65718.herokuapp.com/avatar', {
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

  // display component only when user submits the image:
  const componentDisplayState = imageUrl ? 'flex' : 'dn';
  
  // display error only when error occurs:
  const errorDisplayState = imageDetectionError ? 'db' : 'dn';

  return (
      <div className={componentDisplayState + ' center-column ma'}>
        <p className={errorDisplayState + ' center f4 dark-red'}>{imageDetectionError}</p>
        <div 
          className='relative center center-column mt2'>
          <img className='face-img shadow-2 mb3' src={imageUrl} id='input-image' alt=''/>
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
            className="code mb5 w-80 w-20-ns w-30-m grow f6 link ph3 pv2 dib white">Set as avatar
          </button>
      </div>
    );
}

export default FaceRecognition;