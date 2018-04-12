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
    const displayState = imageUrl ? 'db' : 'dn';

    return (
      <div className='center-column ma'>
        <div 
          className={displayState + ' absolute center center-column mt2'}>
          <img className='shadow-2 mb3' src={imageUrl} id='input-image' alt='' width='500' heigh='auto'/>
          <div
            className='bounding-box'
            style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}>
          </div>

          <button 
            style={{top: '-2.5rem'}}
            onClick={this.updateAvatar}
            className="relative code mb-3 w-30 grow f6 link ph3 pv2 dib white">Set as avatar
          </button>
        </div>
      </div>
    );
  }
}

export default FaceRecognition;