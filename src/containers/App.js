import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
  onRouteChange,
  loadUserData,
  sendUserData,
  updateUserData,
  deleteUserData,
  onInputChange,
  updateImageUrl,
  changeErrorMessage,
  displayFaceBoxes,
  resetImageData,
  updateLocalUserInfo,
  resetApp
} from '../actions';
import { removeUserDataLocally } from '../helpers';
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
import ChangeName from '../components/ChangeName/ChangeName';
import ChangeEmail from '../components/ChangeEmail/ChangeEmail';
import DeleteProfile from '../components/DeleteProfile/DeleteProfile';
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
    input: state.imageReducer.input,
    user: state.userReducer
  }
}

// declare which action creators you need to be able to dispatch:
const mapDispatchToProps = (dispatch) => {
  return {
    sendUserData: (data, action) => dispatch(sendUserData(data, action)),
    updateUserData: (data, action) => dispatch(updateUserData(data, action)),
    loadUserData: (data) => dispatch(loadUserData(data)),
    deleteUserData: (data) => dispatch(deleteUserData(data)),
    updateLocalUserInfo: (propToUpdate, newData) => dispatch(updateLocalUserInfo(propToUpdate, newData)),
    resetImageData: () => dispatch(resetImageData()),
    displayFaceBoxes: (boxes) => dispatch(displayFaceBoxes(boxes)),
    changeErrorMessage: (message) => dispatch(changeErrorMessage(message)),
    updateImageUrl: (url) => dispatch(updateImageUrl(url)),
    onRouteChange: (route) => dispatch(onRouteChange(route)),
    handleChange: (event) => dispatch(onInputChange(event)),
    resetApp: () => dispatch(resetApp())
  }
}



class App extends Component {

  componentDidMount = () => {
    // check local storage in case user was previously signed in
    const cachedUser = localStorage.getItem('user');

    if (cachedUser) {
      // load user data without accessing database:
      this.props.loadUserData(JSON.parse(cachedUser));
      return;
    }
  }


  onRouteChange = (route) => {
    if (route === 'signin') {
      // reset app to initial state when user signs out
      this.props.resetApp();

      // remove all user data from local storage
      // so that user stays logged out after return:
      removeUserDataLocally('user');
    }

    // clear any previous error messages:
    this.props.changeErrorMessage('');

    // else just change route
    this.props.onRouteChange(route);
  }


  render() {
    const { input, imageUrl, faceBoxes } = this.props;
    const { name, id, entries, avatar, message, isSignedIn, route } = this.props.user;
    

    const homeSection = (
      <div>
        <Avatar 
            onRouteChange={this.onRouteChange}
            avatar={avatar}/>
        <Rank 
            name={name} 
            entries={entries}/>
         <ImageSubmit 
            id={id}
            input={input}
            updateLocalUserInfo={this.props.updateLocalUserInfo}
            updateUserData={this.props.updateUserData}
            displayFaceBoxes={this.props.displayFaceBoxes}
            changeErrorMessage={this.props.changeErrorMessage}
            handleChange={this.props.handleChange}
            updateImageUrl={this.props.updateImageUrl}
            resetImageData={this.props.resetImageData}
            onSelfieSubmit={this.props.onSelfieSubmit}/>
         <FaceRecognition 
            changeErrorMessage={this.props.changeErrorMessage}
            updateUserData={this.props.updateUserData}
            id={id}
            avatar={avatar}
            faceBoxes={faceBoxes}
            message={message}
            imageUrl={imageUrl} />
      </div>
    );

  
    const signinSection = (
      <Signin 
        changeErrorMessage={this.props.changeErrorMessage}
        message={message}
        sendUserData={this.props.sendUserData}
        onRouteChange={this.onRouteChange}
        resetImageData={this.props.resetImageData} />
    );

    const registerSection = (
      <Register 
        changeErrorMessage={this.props.changeErrorMessage}
        message={message}
        sendUserData={this.props.sendUserData}
        onRouteChange={this.onRouteChange} />
    );

    const profileSection = (
      <Profile 
        onRouteChange={this.onRouteChange}
        user={this.props.user} >
        <Avatar 
          avatar={avatar}
	        onRouteChange={this.onRouteChange} />
      </Profile>
    );

    const changeNameSection = (
      <ChangeName 
          user={this.props.user}
          onRouteChange={this.onRouteChange}
          updateUserData={this.props.updateUserData}
          changeErrorMessage={this.props.changeErrorMessage} >
          <Avatar 
	          onRouteChange={this.onRouteChange}
	          avatar={avatar} />
        </ChangeName>
    );


    const changeEmailSection = (
      <ChangeEmail 
            user={this.props.user}
            onRouteChange={this.onRouteChange}
            updateUserData={this.props.updateUserData}
            changeErrorMessage={this.props.changeErrorMessage} >
            <Avatar 
              onRouteChange={this.onRouteChange}
              avatar={avatar} />
      </ChangeEmail>
    );


    const deleteProfileSection = (
      <DeleteProfile 
            user={this.props.user} 
            onRouteChange={this.onRouteChange}
            deleteUserData={this.props.deleteUserData}
            changeErrorMessage={this.props.changeErrorMessage} >
            <Avatar 
              onRouteChange={this.onRouteChange}
              avatar={avatar} />
      </DeleteProfile>
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
            onRouteChange={this.onRouteChange}
            route={route}
            isSignedIn={isSignedIn} >
            <Logo
                onRouteChange={this.onRouteChange}
                isSignedIn={isSignedIn} />
        </Navigation>

        { route === 'home' ? homeSection
          : route === 'profile' ?  profileSection
            :  route === 'changeName' ? changeNameSection
              :  route === 'changeEmail' ? changeEmailSection
                :  route === 'deleteProfile' ? deleteProfileSection
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

