import React, { Component } from 'react';
import {MobileView, isMobileOnly} from 'react-device-detect';
import Particles from 'react-particles-js';
import { DATABASE_LINK } from '../constants.js';
import {ImageCapture} from 'image-capture';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import Navigation from '../components/Navigation/Navigation';
import Signin from '../components/Signin/Signin';
import Register from '../components/Register/Register';
import Logo from '../components/Logo/Logo';
import ImageSubmit from '../components/ImageSubmit/ImageSubmit';
import Avatar from '../components/Avatar/Avatar';
import Rank from '../components/Rank/Rank';
import Profile from '../components/Profile/Profile';
import ChangeName from '../components/ChangeName/ChangeName';
import ChangeEmail from '../components/ChangeEmail/ChangeEmail';
import './App.css';



const particlesOptions = {
  particles: {
    number: {
      value: 120,
      density: {
        enable: true,
        value_area: 700
      }
    }
  }
}

// set initial state to rollback user details
// after sign out
const initialState = {
  input: '',
  imageUrl: '',
  imageDetectionError: '',
  faceBoxes: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
    avatarUrl: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }


  componentDidMount = () => {
    // check local storage in case user was previously signed in
    const cachedUser = localStorage.getItem('user');

    if (cachedUser) {
      // load user data without accessing database:
      this.loadUser(JSON.parse(cachedUser));
      this.onRouteChange('home');
      this.setState({isSignedIn: true});
      return;
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
      avatarUrl: data.avatar
    }});
    // save user data in local storage:
    this.storeUserData('user', data);
  }

  storeUserData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  }

  updateUserData = (target, newValue) => {
    let userData = localStorage.getItem('user');

    if (userData) {
      userData = JSON.parse(userData);
      userData[target] = newValue;
      localStorage.setItem('user', JSON.stringify(userData));
    } 
  }


  updateUserName = (newName) => {
    this.setState(Object.assign(this.state.user, { name: newName }));

    // update user info in local storage for further session:
    this.updateUserData('name', newName);
  }

  updateUserEmail = (newEmail) => {
    this.setState(Object.assign(this.state.user, { email: newEmail }));
    this.updateUserData('email', newEmail);
  }

  // calculate location of the box on the face
  calculateFaceLocation = (data) => {
    const regions = data.outputs[0].data.regions;
    // do not calculate face location if no face was detected:
    if (regions === undefined) {
      this.setState(Object.assign(this.state, { imageDetectionError: 'Unable to detect any faces'}))
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


  displayFaceBoxes = (boxes) => {
    this.setState({faceBoxes: boxes});
  }


  onInputChange = (e) => {
    this.setState({input: e.target.value.trim() });
  }


  isValidLink = (url) => {
    return /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/.test(url);
  }

  sendImageForFaceRecognition = (url) => {
    // display submitted image on the page:
     this.setState(Object.assign(this.state, {imageUrl:  url}));

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
        this.setState(Object.assign(this.state, { imageDetectionError: 'Cannot process this image'}))
        // pass error response to next then() method:
        return response;
      }

      // else try anddetect faces:
      this.displayFaceBoxes(this.calculateFaceLocation(response));
    })
    .then(response => {

      // if image url was valid, change # of sumbitted entries in the database:
      if (response !== 'error') {
        fetch(`${DATABASE_LINK}/image`, {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          // Object.assign(target, ...sources) 
          // overwrite user's original entries count from the sources
          this.setState(Object.assign(this.state.user, { entries: count}))
          this.updateUserData('entries', count);
        })
        .catch(console.log);
      }
    })
    .catch(err => {
      this.setState(Object.assign(this.state, { imageDetectionError: 'Cannot process this image'}))
      console.log('Error from server: ', err);
    });
  }


  onImageSubmit = (e) => {
    console.log('Detect button was clicked!');
    e.preventDefault();

    // do not proceed if user input is empty:
    if (!this.state.input) return;

     // clear previous face recognition result:
    this.setState(Object.assign(this.state, { faceBoxes: [] }));

     // clear previous face recognition errors:
    this.setState(Object.assign(this.state, { imageDetectionError: ''}));

    // send image link to server to begin face recognition
    this.sendImageForFaceRecognition(this.state.input);
  }

  

  onSelfieSubmit = (e) => {
    e.preventDefault();

    this.onImageReset();

    let videoDevice;

    const failedToGetMedia = (error => console.log(error));

    const gotMedia = (mediaStream) => {
      // extract video track:
      videoDevice = mediaStream.getVideoTracks()[0];

      // check if this device supports a picture mode:
      let captureDevice = new ImageCapture(videoDevice);
      if (captureDevice) {
        captureDevice.takePhoto().then(processPhoto).catch(stopCamera);
      }
    }

    const convertBlobToBase64 = (blob, callback) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob); 
      reader.onloadend = () => callback(reader.rgesult);
    };
     
    const processPhoto = (blob) => {
      convertBlobToBase64(blob, this.sendImageForFaceRecognition);
    }
     
    const stopCamera = (error) => {
      console.error(error);
      if (videoDevice) videoDevice.stop();  // turn off the camera
    }
     
    // ask user to permit camera recording:
    navigator.mediaDevices.getUserMedia({video: true}).then(gotMedia).catch(failedToGetMedia);
 
    document.querySelector('.face-img').addEventListener('load', function () {

      // after the image loads, discard the image object to release the memory:
      window.URL.revokeObjectURL(this.src);
      console.log('Image is discarded!');
      stopCamera();
    });
  }



  onImageReset =() => {
    // clear all previous results:
    document.querySelector('.form').reset();
    this.setState(Object.assign(this.state, { input: ''}));
    this.setState(Object.assign(this.state, { faceBoxes: []}));
    this.setState(Object.assign(this.state, { imageUrl: '' }));
    this.setState(Object.assign(this.state, { imageDetectionError: ''}));
  }


  
  // change user avatar to currently submitted image 
  onAvatarSubmit = () => {
    this.setState(
      Object.assign(
        this.state.user, 
          { avatarUrl: this.state.imageUrl }
      )
    );
    this.updateUserData('avatar', this.state.imageUrl);
  }


  onRouteChange = (route) => {
    if (route === 'signin') {
      this.setState(initialState);

      // clear user data from local storage
      // so that user stays logged out after return:
      localStorage.removeItem('user');
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }


  render() {
    const { isSignedIn, imageUrl, imageDetectionError, route, faceBoxes } = this.state;
    const { id, name, entries, avatarUrl } = this.state.user;

    
    const homeSection = (
      <div>
        <Avatar
          onRouteChange={this.onRouteChange}
          avatarUrl={avatarUrl} />
        <Rank 
          name={name}
          entries={entries}
        />
        <ImageSubmit 
          onInputChange={this.onInputChange}
          onImageSubmit={this.onImageSubmit}
          onImageReset={this.onImageReset}
          onSelfieSubmit={this.onSelfieSubmit}
        />
        <FaceRecognition 
          imageDetectionError={imageDetectionError}
          id={id}
          faceBoxes={faceBoxes} 
          imageUrl={imageUrl}
          avatarUrl={avatarUrl}
          onAvatarSubmit={this.onAvatarSubmit} />
      </div>
    );


    const profileSection = (
      <Profile 
        onRouteChange={this.onRouteChange}
        user={this.state.user} >
        <Avatar 
	        onRouteChange={this.onRouteChange}
	        avatarUrl={avatarUrl} />
      </Profile>
    );

    const changeNameSection = (
      <ChangeName 
          updateUserName={this.updateUserName}
          onRouteChange={this.onRouteChange}
          user={this.state.user} >
          <Avatar 
	          onRouteChange={this.onRouteChange}
	          avatarUrl={avatarUrl} />
        </ChangeName>
    );


    const changeEmailSection = (
      <ChangeEmail 
          updateUserEmail={this.updateUserEmail}
          onRouteChange={this.onRouteChange}
          user={this.state.user} >
          <Avatar 
	          onRouteChange={this.onRouteChange}
	          avatarUrl={avatarUrl} />
      </ChangeEmail>
    );


    const signinSection = (
      <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
    );

    const registerSection = (
      <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
    );


    return (
      <div className="app">
        <MobileView device={!isMobileOnly}>
          <Particles className='particles' params={particlesOptions} />
        </MobileView>

        <Navigation 
          route={route}
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}>
          <Logo />
        </Navigation>

        { route === 'home' ? homeSection
            : route === 'profile' ?  profileSection
                :  route === 'changeName' ? changeNameSection
                  :  route === 'changeEmail' ? changeEmailSection
                    : route === 'signin' ? signinSection
                      : registerSection
        }
      </div>
    );
  }
}

export default App;
