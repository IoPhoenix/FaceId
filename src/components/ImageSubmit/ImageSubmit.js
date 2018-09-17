import React from 'react';
import './ImageSubmit.css';

const ImageSubmit = ({onInputChange, onSelfieSubmit, onImageSubmit, onImageReset}) => {
  return (
    <div className='mb3'>
      <p className='f5s'>
        {'This FaceId app will detect faces in your pictures. Give it a try.'}
      </p>
      <div className='center'>
        <form className='form center pa4 br3 shadow-5'>
          <input
            className='user-input f4 pa2 w-100 w-90-ns w-100-l center code mb2'
            type='text'
            placeholder='Enter image url or take a selfie...'
            onChange={onInputChange}/>
            
          <div className='di buttons'>
            <button 
              type="submit"
              className='user-camera near-white code w-100 w-30-ns w-auto-l grow link'
              onClick={onSelfieSubmit}>
              <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="1.414">
                <path d="M 12 3.5 L 11.5 2.41528547 C 11.5 2.41528547 11.0826911 1.5 10.5 1.5 L 5.5 1.5 C 4.91636759 1.5 4.5 2.41528544 4.5 2.41528544 L 4 3.5 L 2.38174379 3.5 C 2.38174379 3.5 0.5 3.65837937 0.5 5.5 L 0.5 12.5 C 0.5 14.3416206 2.38174379 14.5 2.38174379 14.5 L 13.5 14.5 C 13.5 14.5 15.5 14.3416206 15.5 12.5 L 15.5 5.5 C 15.5 3.65837937 13.5 3.5 13.5 3.5 L 12 3.5 Z" fill="none" stroke="currentColor"/>
                <path d="M 8 12.5 C 10.209139 12.5 12 10.709139 12 8.5 C 12 6.290861 10.209139 4.5 8 4.5 C 5.790861 4.5 4 6.290861 4 8.5 C 4 10.709139 5.790861 12.5 8 12.5 Z" fill="none" stroke="currentColor"/>
                <path d="M 8 10.5 C 9.1045695 10.5 10 9.6045695 10 8.5 C 10 7.3954305 9.1045695 6.5 8 6.5 C 6.8954305 6.5 6 7.3954305 6 8.5 C 6 9.6045695 6.8954305 10.5 8 10.5 Z" fill="none" stroke="currentColor"/>
              </svg>
            </button>
            <button
              type="submit"
              style={{ padding: '0.57rem 1.3rem', verticalAlign: 'top'}}
              className='code w-100 w-30-ns w-auto-l grow link dib white'
              onClick={onImageSubmit}
            >Detect</button>
            <button
              type="reset"
              style={{ padding: '0.57rem 1.3rem', verticalAlign: 'top'}}
              className='code w-100 w-30-ns w-auto-l grow link dib white'
              onClick={onImageReset}
            >Reset</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ImageSubmit;