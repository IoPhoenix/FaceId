import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
  onRouteChange,
  loadUserData,
  onInputChange,
  updateImageUrl,
  changeErrorMessage,
  displayFaceBoxes,
  onImageReset,
  onAvatarSubmit
} from '../actions';
import { BrowserView, TabletView, MobileView } from 'react-device-detect';
import Particles from 'react-particles-js';
import Navigation from '../components/Navigation/Navigation';
import Signin from '../components/Signin/Signin';
import Register from '../components/Register/Register';
import Logo from '../components/Logo/Logo';
import Profile from '../components/Profile/Profile';
import ImageSubmit from '../components/ImageSubmit/ImageSubmit';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import Avatar from '../components/Avatar/Avatar';
import Rank from '../components/Rank/Rank';
import './App.css';


const particlesOptionsForBrowser = {
  particles: {
    number: {
      value: 100
    },
    size: {
      value: 4
    }
  },
  interactivity: {
    onhover: {
      enable: true,
      mode: 'bubble'
    }
  }
}

const particlesOptionsForTablet = {
  particles: {
    number: {
      value: 60
    },
    size: {
      value: 4
    }
  }
}

const particlesOptionsForMobile = {
  particles: {
    number: {
      value: 30
    },
    size: {
      value: 2
    }
  }
}

// declare what pieces of state you want to have access to:
const mapStateToProps = (state) => {
  return {
    faceBoxes: state.imageReducer.faceBoxes,
    imageUrl: state.imageReducer.imageUrl,
    imageDetectionError: state.imageReducer.imageDetectionError,
    input: state.imageReducer.input,
    route: state.routeReducer.route,
    isSignedIn: state.routeReducer.isSignedIn,
    user: state.changeUserData
  }
}

// declare which action creators you need to be able to dispatch:
const mapDispatchToProps = (dispatch) => {
  return {
    onAvatarSubmit: (url) => dispatch(onAvatarSubmit(url)),
    onImageReset: () => dispatch(onImageReset()),
    displayFaceBoxes: (boxes) => dispatch(displayFaceBoxes(boxes)),
    changeErrorMessage: (message) => dispatch(changeErrorMessage(message)),
    updateImageUrl: (url) => dispatch(updateImageUrl(url)),
    onRouteChange: (route) => dispatch(onRouteChange(route)),
    loadUserData: (user) => dispatch(loadUserData(user)),
    handleChange: (event) => dispatch(onInputChange(event)),
  }
}



class App extends Component {

  componentDidMount = () => {
    // check local storage in case user was previously signed in
    const cachedUser = localStorage.getItem('user');

    if (cachedUser) {
      // load user data without accessing database:
      this.props.loadUserData(JSON.parse(cachedUser));
      this.props.onRouteChange('home');
      return;
    }
  }

  componentDidUpdate() {
    console.log('App component was updated!');
  }

  render() {
    const { route, input, imageUrl, onRouteChange, loadUserData, isSignedIn, faceBoxes } = this.props;
    const { name, id, entries, avatarUrl } = this.props.user;
    
    const homeSection = (
      <div>
        <Avatar 
          onRouteChange={onRouteChange}
          avatarUrl={avatarUrl}/>
        <Rank 
          name={name} 
          entries={entries}/>
         <ImageSubmit 
          input={input}
          id={id}
          displayFaceBoxes={this.props.displayFaceBoxes}
          changeErrorMessage={this.props.changeErrorMessage}
          handleChange={this.props.handleChange}
          updateImageUrl={this.props.updateImageUrl}
          onImageReset={this.props.onImageReset}
          onSelfieSubmit={this.props.onSelfieSubmit}/>
         <FaceRecognition 
          id={id}
          onAvatarSubmit={this.props.onAvatarSubmit}
          faceBoxes={faceBoxes}
          imageDetectionError={this.props.imageDetectionError}
          imageUrl={imageUrl} />
      </div>
    );

  
    const signinSection = (
      <Signin loadUserData={loadUserData} onRouteChange={onRouteChange}/>
    );

    const registerSection = (
      <Register loadUserData={loadUserData} onRouteChange={onRouteChange}/>
    );

    const profileSection = (
      <Profile 
        onRouteChange={onRouteChange}
        user={this.props.user} >
        <Avatar 
          avatarUrl={avatarUrl}
	        onRouteChange={onRouteChange} />
      </Profile>
    );


    return (
      <div className="app">
        <BrowserView>
          <Particles className='particles' params={particlesOptionsForBrowser} />
        </BrowserView>

        <TabletView>
          <Particles className='particles' params={particlesOptionsForTablet} />
        </TabletView>

        <MobileView>
          <Particles className='particles' params={particlesOptionsForMobile} />
        </MobileView>

        <Navigation 
          onRouteChange={onRouteChange}
          route={route}
          isSignedIn={isSignedIn} >
          <Logo />
        </Navigation>

        { route === 'home' ? homeSection
          : route === 'profile' ?  profileSection
            : route === 'signin' ? signinSection
              : registerSection
        }
      </div>
    );
  }
}

// export default App;
// use connect to connect React to Redux:
export default connect(mapStateToProps, mapDispatchToProps)(App);

