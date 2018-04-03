import React from 'react';
import './Form.css';

const Form = () => {
  return (
    <div>
      <p className='f4 mt5'>
        {'This FaceId app will detect faces in your pictures. Git it a try.'}
      </p>
      <div className='center'>
        <div className='form center pa4 br3 shadow-5'>
          <input className='f4 pa2 w-70 center' type='tex'/>
          <button
            className='code w-30 grow f4 link ph3 pv2 dib white'
          >Detect</button>
        </div>
      </div>
    </div>
  );
}

export default Form;