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
            className='f4 pa2 w-100 w-70-ns center code'
            type='text'
            placeholder='Enter image url...'
            onChange={onInputChange}/>
          <button
            style={{ padding: '.6rem', verticalAlign: 'top'}}
            className='code w-100 w-30-ns grow link dib white'
            onClick={onImageSubmit}
          >Detect</button>
        </div>
      </div>
    </div>
  );
}

export default Form;