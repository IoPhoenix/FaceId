import React from 'react';
import { DATABASE_LINK } from '../../constants.js';
import './ImageSubmit.css';

const ImageSubmit = (props) => {

  const resetImageData =() => {
    // clear all previous results:
    document.querySelector('.form').reset();
    props.resetImageData();
  }

  const onSelfieSubmit = (e) => {
    e.preventDefault();

    // clear previous results:
    props.resetImageData();

    let videoDevice;

    const failedToGetMedia = (err) => {
      console.log('From failedToGetMedia: ', err.name + ': ' + err.message);
      let errorMessage = '';

      // handle the error
      if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
          // required track is missing
          errorMessage = 'Camera not found';
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
          // webcam or mic are already in use
          errorMessage = 'Camera already in use';
      } else if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          // permission denied in browser
          errorMessage = 'Access denied';
      } else {
          // other errors
          errorMessage = 'Something went wrong. Please try again later or provide image url';
      }
      props.changeErrorMessage(errorMessage);
    };

    const gotMedia = (mediaStream) => {
      // extract video track:
      videoDevice = mediaStream.getVideoTracks()[0];
      console.log('videoDevice: ', videoDevice);

      // check if this device supports a picture mode:
      let captureDevice = new ImageCapture(videoDevice);
      console.log('captureDevice: ', captureDevice);
      if (captureDevice) {
        captureDevice.takePhoto().then(processPhoto).catch(stopCamera);
      }
    }

    const convertBlobToBase64 = (blob, callback) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob); 
      reader.onloadend = () => {
        console.log('Reader: ', reader, 'reader.result: ', reader.result);

        callback(reader.result);
      }
    };
     
    const processPhoto = (blob) => {
      console.log('blob is ', blob);
      convertBlobToBase64(blob, sendImageForFaceRecognition);
    }
     
    const stopCamera = (error) => {
      if (videoDevice) videoDevice.stop();  // turn off the camera
    }
     
    // ask user to permit camera recording:
    navigator.mediaDevices.getUserMedia({video: true}).then(gotMedia).catch(failedToGetMedia);
 
    document.querySelector('.face-img').addEventListener('load', function () {

      // after the image loads, discard the image object to release the memory:
      // window.URL.revokeObjectURL(this.src);
      console.log('Image is discarded!');
      stopCamera();
      console.log('Camera is stopped');
    });
  }


   // calculate location of the box on the face
   const calculateFaceLocation = (data) => {
    const regions = data.outputs[0].data.regions;
    
    // do not calculate face location if no face was detected:
    if (regions === undefined) {
      props.changeErrorMessage('Unable to detect any faces');
      return [];
    } else {

      // calculate coordinates for each face box
      const image = document.getElementById('input-image');
      const imageWidth = Number(image.width);
      const imageHeight = Number(image.height);
      
      const boxes = regions.map(region => {
        const clarifaiFace = region.region_info.bounding_box;
        return { 
          leftCol: clarifaiFace.left_col * imageWidth,
          topRow: clarifaiFace.top_row * imageHeight,
          rightCol: imageWidth - (clarifaiFace.right_col * imageWidth),
          bottomRow: imageHeight - (clarifaiFace.bottom_row * imageHeight)
        }
      });
     
      return boxes; // return array of objects
    }
  }

  const sendImageForFaceRecognition = (url) => {
    // display submitted image on the page:
     props.updateImageUrl(url);

    // clear any previous error messages:  
     props.changeErrorMessage('');


    fetch(`${DATABASE_LINK}/imageurl`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: url
      })
    })
    .then(response => response.json())
    .then(response => {
      // do not proceed if image link was invalid:
      if (response === 'error') {
        props.changeErrorMessage('Cannot process this image');

        // pass error response to next then() method:
        return response;
      }

      // else try and detect faces:
      props.displayFaceBoxes(calculateFaceLocation(response));
    })
    .then(response => {

      // if image url was valid, change # of sumbitted entries in the database:
      if (response !== 'error') {
        fetch(`${DATABASE_LINK}/image`, {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: props.id
          })
        })
        .then(response => response.json())
        .then(count => {
            props.updateUserInfo('entries', count);
        })
        .catch(console.log);
      }
    })
    .catch(err => {
      props.changeErrorMessage('Cannot process this image');
      console.log('Error from server: ', err);
    });
  }


  const onImageSubmit = (e) => {
    e.preventDefault();



    // clear any previous face boxes
    props.displayFaceBoxes([]);

    // do not proceed if user input is empty:
    if (!props.input) return;

    // send image link to server to begin face recognition
    sendImageForFaceRecognition(props.input);
  }


  return (
    <div className='mb3'>
      <p className='f5s'>
        {'This FaceId app will detect faces in your pictures. Give it a try.'}
      </p>
      <div className='center'>
        <form className='form center pa4 br3 shadow-5'>
          <input
            value={props.input}
            className='user-input f4 pa2 w-100 w-90-ns w-100-l center code mb2'
            type='text'
            placeholder='Enter image url or take a selfie...'
            onChange={props.handleChange} />

          <div className='di buttons'>
            <button 
              type="submit"
              className='user-camera near-white code w-100 w-30-ns w-auto-l grow link'
              onClick={onSelfieSubmit}>
              <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="1.414">
                <path d="M 12 3.5 L 11.5 2.41528547 C 11.5 2.41528547 11.0826911 1.5 10.5 1.5 L 5.5 1.5 C 4.91636759 1.5 4.5 2.41528544 4.5 2.41528544 L 4 3.5 L 2.38174379 3.5 C 2.38174379 3.5 0.5 3.65837937 0.5 5.5 L 0.5 12.5 C 0.5 14.3416206 2.38174379 14.5 2.38174379 14.5 L 13.5 14.5 C 13.5 14.5 15.5 14.3416206 15.5 12.5 L 15.5 5.5 C 15.5 3.65837937 13.5 3.5 13.5 3.5 L 12 3.5 Z" fill="none" stroke="currentColor"/>
                <path d="M 8 12.5 C 10.209139 12.5 12 10.709139 12 8.5 C 12 6.290861 10.209139 4.5 8 4.5 C 5.790861 4.5 4 6.290861 4 8.5 C 4 10.709139 5.790861 12.5 8 12.5 Z" fill="none" stroke="currentColor"/>
                <path d="M 8 10.5 C 9.1045695 10.5 10 9.6045695 10 8.5 C 10 7.3954305 9.1045695 6.5 8 6.5 C 6.8954305 6.5 6 7.3954305 6 8.5 C 6 9.6045695 6.8954305 10.5 8 10.5 Z" fill="none" stroke="currentColor"/>
              </svg>
            </button>
            <button
              type="submit"
              style={{ padding: '0.57rem 1.3rem', verticalAlign: 'top'}}
              className='code w-100 w-30-ns w-auto-l grow link dib white'
              onClick={onImageSubmit}>
                Detect</button>
            <button
              type="reset"
              style={{ padding: '0.57rem 1.3rem', verticalAlign: 'top'}}
              className='code w-100 w-30-ns w-auto-l grow link dib white'
              onClick={resetImageData}>
                Reset</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ImageSubmit;