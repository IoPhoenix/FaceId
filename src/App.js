import React, { Component } from 'react';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Form from './components/Form/Form';
import Rank from './components/Rank/Rank';
import './App.css';

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      },
      "shape": {
        "type": "circle"
      },
      "size": {
        "value": 20,
         "random": true,
         "anim": {
          "enable": true,
          "speed": 180
         }
      }
    }
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation>
          <Logo />
        </Navigation>
        <Rank />
        <Form />
        <FaceRecognition />
      </div>
    );
  }
}

export default App;
