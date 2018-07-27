import React, { Component } from 'react';
import {MobileView, isMobileOnly} from 'react-device-detect';
import Particles from 'react-particles-js';
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

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
      avatarUrl: data.avatar
    }});
  }


  updateUserName = (newName) => {
    this.setState(Object.assign(this.state.user, { name: newName }));
  }

  updateUserEmail = (newEmail) => {
    this.setState(Object.assign(this.state.user, { email: newEmail }));
  }

  // calculate location of the box on the face
  calculateFaceLocation = (data) => {

    // do not calculate face location if no face was detected:
    if (data.outputs[0].data.regions === undefined) {
      this.setState(Object.assign(this.state.user, { imageDetectionError: 'Unable to detect any faces!'}))
      return [];
    } else {

      // calculate coordinates for each face box
      const image = document.getElementById('input-image');
      const imageWidth = Number(image.width);
      const imageHeight = Number(image.height);
      
      const boxes = data.outputs[0].data.regions.map(region => {
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


  onImageSubmit = () => {
    // do not proceed if user input is empty:
    if (!this.state.input) return;

     // clear previous face recognition result:
    this.setState(Object.assign({ faceBoxes: [] }));

     // clear previous face recognition errors:
    this.setState(Object.assign(this.state.user, { imageDetectionError: ''}));

    // send image link to server to begin face recognition
    this.setState({imageUrl: this.state.input});
      fetch('https://calm-forest-65718.herokuapp.com/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
        if (response) {
          // change # of sumbitted entries in database
          fetch('https://calm-forest-65718.herokuapp.com/image', {
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
          })
          .catch(console.log)
        }
        this.displayFaceBoxes(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }


  // change user avatar to currently submitted image 
  onAvatarSubmit = () => {
    this.setState(
      Object.assign(
        this.state.user, 
          { avatarUrl: this.state.imageUrl }
      )
    );
  }


  onRouteChange = (route) => {
    if (route === 'signin') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }


  render() {
    const { isSignedIn, imageUrl, imageDetectionError, route, faceBoxes } = this.state;
    const { id, name, entries, avatarUrl } = this.state.user;

    const avatarSection = (<Avatar onRouteChange={this.onRouteChange} avatarUrl={avatarUrl} />);
    
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
          onImageSubmit={this.onImageSubmit}/>
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
        { avatarSection }
      </Profile>
    );

    const changeNameSection = (
      <ChangeName 
          updateUserName={this.updateUserName}
          onRouteChange={this.onRouteChange}
          user={this.state.user} >
          { avatarSection }
        </ChangeName>
    );


    const changeEmailSection = (
      <ChangeEmail 
          updateUserEmail={this.updateUserEmail}
          onRouteChange={this.onRouteChange}
          user={this.state.user} >
          { avatarSection }
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
