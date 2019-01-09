import React, { Component } from 'react';
import {connect} from 'react-redux';
import {onRouteChange, loadUserData} from '../actions';
import Navigation from '../components/Navigation/Navigation';
import Signin from '../components/Signin/Signin';
import Register from '../components/Register/Register';
import Logo from '../components/Logo/Logo';
import ImageSubmit from '../components/ImageSubmit/ImageSubmit';
import Avatar from '../components/Avatar/Avatar';
import Rank from '../components/Rank/Rank';
import './App.css';


// declare what pieces of state you want to have access to:
const mapStateToProps = (state) => {
  return {
    route: state.routeReducer.route,
    isSignedIn: state.routeReducer.isSignedIn,
    id: state.registerReducer.id,
    name: state.registerReducer.name,
    email: state.registerReducer.email,
    entries: state.registerReducer.entries,
    joined: state.registerReducer.joined,
    avatarUrl: state.registerReducer.avatar
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


  render() {
    const { route, name, onRouteChange, loadUserData } = this.props;
    
    const homeSection = (
      <div>
        <Avatar />
        <Rank name={name}/>
        <ImageSubmit />
      </div>
    );

  
    const signinSection = (
      <Signin loadUserData={loadUserData} onRouteChange={onRouteChange}/>
    );

    const registerSection = (
      <Register loadUserData={loadUserData} onRouteChange={onRouteChange}/>
    );


    return (
      <div className="app">

        <Navigation>
          <Logo />
        </Navigation>

        { route === 'home' ? homeSection
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

