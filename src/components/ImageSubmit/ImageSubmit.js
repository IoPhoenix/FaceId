import React from 'react';
import './ImageSubmit.css';

const ImageSubmit = ({onInputChange, onImageSubmit, onImageReset}) => {
  return (
    <div className='mb3'>
      <p className='f5s'>
        {'This FaceId app will detect faces in your pictures. Give it a try.'}
      </p>
      <div className='center'>
        <form className='form center pa4 br3 shadow-5'>
          <input 
            className='f4 pa2 w-100 w-80-ns w-70-l center code'
            type='text'
            placeholder='Enter image url...'
            onChange={onInputChange}/>
          <div className='di'>
          <button
            type="submit"
            style={{ padding: '0.57rem 1.3rem', verticalAlign: 'top'}}
            className='code w-100 w-40-ns w-auto-l grow link dib white'
            onClick={onImageSubmit}
          >Detect</button>
          <button
            type="reset"
            style={{ padding: '0.57rem 1.3rem', verticalAlign: 'top'}}
            className='code w-100 w-40-ns w-auto-l grow link dib white'
            onClick={onImageReset}
          >Reset</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ImageSubmit;