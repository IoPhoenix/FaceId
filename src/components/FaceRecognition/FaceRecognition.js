import React from 'react';
import './FaceRecognition.css';

class FaceRecognition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarurl: ''
    }
  }

  updateAvatar = () => {
    fetch('http://localhost:3000/avatar', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: this.props.id,
        avatarUrl: this.props.imageUrl
      })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Avatar link was saved in database: ', data);
        this.props.onAvatarSubmit();
    })
    .catch(console.log);
  }

  render() {
    const {imageUrl, box} = this.props;

    // display component only when user submits the image:
    const displayState = imageUrl ? 'flex' : 'dn';

    return (
      <div className={displayState + ' center-column ma'}>
        <div 
          className='relative center center-column mt2'>
          <img className='shadow-2 mb3' src={imageUrl} id='input-image' alt='' width='500' heigh='auto'/>
          <div
            className='bounding-box'
            style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}>
          </div>
        </div>
        <button 
            onClick={this.updateAvatar}
            className="code mb5 w-20 grow f6 link ph3 pv2 dib white">Set as avatar
          </button>
      </div>
    );
  }
}

export default FaceRecognition;