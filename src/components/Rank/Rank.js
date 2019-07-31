import React from 'react';
import { capitalize } from '../../helpers';


class Rank extends React.Component {
  constructor() {
    super();
    this.state = {
      emoji: 'test'
    }
  }
  
  componentDidMount() {
    this.generateEmoji(this.props.entries);
  }
  

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.entries === this.props.entries) {
      return null;
    }
    
    this.generateEmoji(this.props.entries);
  }

  generateEmoji = (entries) => {
    fetch(`https://v56u3wcym0.execute-api.us-east-1.amazonaws.com/prod/rank?rank=${entries}`)
    .then(response => response.json())
    .then(data => console.log('data: ', data))
    .then(data => this.setState({ emoji: data.input}))
    .catch(console.log);
  }
  
  render() {
    return (
      <div>
        <div className='white f3 mb5'>
          {`${capitalize(this.props.name)}, your # of entries is ${this.props.entries} ${this.state.emoji}`} 
        </div>
      </div>
    )
  }
}

export default Rank;