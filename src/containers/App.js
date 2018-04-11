import React, { Component } from 'react';
import Particles from 'react-particles-js';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import Navigation from '../components/Navigation/Navigation';
import Signin from '../components/Signin/Signin';
import Register from '../components/Register/Register';
import Logo from '../components/Logo/Logo';
import Form from '../components/Form/Form';
import Avatar from '../components/Avatar/Avatar';
import Rank from '../components/Rank/Rank';
import Profile from '../components/Profile/Profile';
import './App.css';


// set initial state to rollback user details
// after sign out
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

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
    avatarurl: ''
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
      joined: data.joined
    }})
  }

  // calculate location of the box on the face
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('input-image');
    const imageWidth = Number(image.width);
    const imageHeight = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * imageWidth,
      topRow: clarifaiFace.top_row * imageHeight,
      rightCol: imageWidth - (clarifaiFace.right_col * imageWidth),
      bottomRow: imageHeight - (clarifaiFace.bottom_row * imageHeight)
    }
  }


  displayFaceBox = (box) => {
    this.setState({box: box});
  }


  onInputChange = (e) => {
    this.setState({input: e.target.value});
  }


  onImageSubmit = () => {
    this.setState({imageUrl: this.state.input});
    this.setState({avatarUrl: this.state.input});
      fetch('http://localhost:3000/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            // Object.assign(target, ...sources) 
            //  overwrite user's original entries count from the sources
            this.setState(Object.assign(this.state.user, { entries: count}))
          })
          .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
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
    const { isSignedIn, imageUrl, route, box, avatarUrl } = this.state;
    console.log(isSignedIn);
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation 
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}>
          <Logo 
            isSignedIn={isSignedIn}
            onRouteChange={this.onRouteChange}/>
        </Navigation>
        { route === 'home'
          ? <div>
              <Avatar
                onRouteChange={this.onRouteChange}
                avatarUrl={avatarUrl} />
              <Rank 
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <Form 
                onInputChange={this.onInputChange}
                onImageSubmit={this.onImageSubmit}/>
              <FaceRecognition 
                box={box} 
                imageUrl={imageUrl}/>
            </div>
          :
            route === 'profile'
              ?  <Profile 
                    onRouteChange={this.onRouteChange}
                    user={this.state.user} >
                    <Avatar
                      onRouteChange={this.onRouteChange}
                      avatarUrl={avatarUrl} />
                  </Profile>
              : 
                route === 'signin'
                ?  <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        }
      </div>
    );
  }
}

export default App;
