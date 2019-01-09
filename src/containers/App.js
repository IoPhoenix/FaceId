import React, { Component } from 'react';
import {connect} from 'react-redux';
import {onRouteChange, loadUserData} from '../actions';
import Navigation from '../components/Navigation/Navigation';
import Signin from '../components/Signin/Signin';
import Register from '../components/Register/Register';
import Logo from '../components/Logo/Logo';
import Profile from '../components/Profile/Profile';
import ImageSubmit from '../components/ImageSubmit/ImageSubmit';
import Avatar from '../components/Avatar/Avatar';
import Rank from '../components/Rank/Rank';
import './App.css';


// declare what pieces of state you want to have access to:
const mapStateToProps = (state) => {
  return {
    route: state.routeReducer.route,
    isSignedIn: state.routeReducer.isSignedIn,
    user: state.registerReducer.user
  }
}

// declare which action creators you need to be able to dispatch:
const mapDispatchToProps = (dispatch) => {
  return {
    onRouteChange: (route) => dispatch(onRouteChange(route)),
    loadUserData: (user) => dispatch(loadUserData(user))
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

  render() {
    const { route, onRouteChange, loadUserData, isSignedIn } = this.props;
    const { name, email, entries, joined, avatarUrl } = this.props.user;
    
    const homeSection = (
      <div>
        <Avatar 
          onRouteChange={onRouteChange}
          avatarUrl={avatarUrl}/>
        <Rank 
          name={name} 
          entries={entries}/>
        <ImageSubmit />
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
        onRouteChange={this.onRouteChange}
        user={this.props.user} >
        <Avatar 
	        onRouteChange={this.onRouteChange} />
      </Profile>
    );


    return (
      <div className="app">

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

