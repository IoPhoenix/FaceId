import React from 'react';
import './Form.css';

const Form = ({onInputChange, onImageSubmit}) => {
  return (
    <div>
      <p className='f5s'>
        {'This FaceId app will detect faces in your pictures. Give it a try.'}
      </p>
      <div className='center'>
        <div className='form center pa4 br3 shadow-5'>
          <input 
            className='f4 pa2 w-70 center'
            type='text'
            placeholder='Enter image url..'
            onChange={onInputChange}/>
          <button
            className='code w-30 grow f5 link ph3 pv2 dib white'
            onClick={onImageSubmit}
          >Detect</button>
        </div>
      </div>
    </div>
  );
}

export default Form;