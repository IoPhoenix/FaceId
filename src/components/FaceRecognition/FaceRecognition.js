import React from 'react';
import './FaceRecognition.css';


const FaceRecognition = (props) => {
  const { id, imageUrl, message, faceBoxes, avatar } = props;
  
  const updateAvatar = () => {

    // if submitted image link and current avatar link are the same, do not proceed:
    if (imageUrl === avatar) return;

    const dataToSend = {
        id: id,
        avatar: imageUrl
    }

    // send new avatar to database:
     props.updateUserData(dataToSend);
  }


  return (
    <div>
      {message && <p className='db center f4 dark-red'>{message}</p>}

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