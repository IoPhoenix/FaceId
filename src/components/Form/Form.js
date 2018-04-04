import React from 'react';
import './Form.css';

const Form = ({onInputChange, onSubmit}) => {
  return (
    <div>
      <p className='f4'>
        {'This FaceId app will detect faces in your pictures. Git it a try.'}
      </p>
      <div className='center'>
        <div className='form center pa4 br3 shadow-5'>
          <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
          <button
            className='code w-30 grow f5 link ph3 pv2 dib white'
            onClick={onSubmit}
          >Detect</button>
        </div>
      </div>
    </div>
  );
}

export default Form;