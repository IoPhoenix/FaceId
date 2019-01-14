import { 
    SIGN_IN_USER_SUCCESS,
    SIGN_IN_USER_FAILURE,
    ON_ROUTE_CHANGE,
    ON_INPUT_CHANGE,
    UPDATE_IMAGE_URL,
    RESET_IMAGE_DATA,
    CHANGE_ERROR_MESSAGE,
    DISPLAY_FACE_BOXES,
    UPDATE_USER_DATA,
    RESET_APP
 } from './constants.js';


import userApi from './api/userApi';

 // since function is being returned, not an object, use redux-thunk middleware:
export function loadUserData(dataToSend) {  
    console.log('Sending user data to server...');
    console.log('dataToSend is: ', dataToSend);


  return function(dispatch) {
    return userApi.signinUser(dataToSend).then(data => {
        console.log('Data returned from the server: ', data);

        dispatch(signinUserSuccess(data));
    }).catch(error => {
        dispatch(signinUserFailure(error));
    });
  };
}

export function signinUserSuccess(data) {  
    return {
        type: SIGN_IN_USER_SUCCESS,
        data
    };
  }


export function signinUserFailure(error) {  
    return {
        type: SIGN_IN_USER_FAILURE,
        error
    };
}


export const onRouteChange = (route) => {
    return {
        type: ON_ROUTE_CHANGE,
        route
    }
}


export const onInputChange = (event) => {
    return {
        type: ON_INPUT_CHANGE,
        input: event.target.value
    }
}


export const updateImageUrl = (url) => {
    return {
        type: UPDATE_IMAGE_URL,
        url
    }
}

export const changeErrorMessage = (message) => {
    return {
        type: CHANGE_ERROR_MESSAGE,
        message
    }
}

export const displayFaceBoxes = (boxes) => {
    return {
        type: DISPLAY_FACE_BOXES,
        boxes
    }
}

export const resetImageData = () => {
    return {
        type: RESET_IMAGE_DATA,
    }
}


export const updateUserInfo = (propToUpdate, newData) => {
    return {
        type: UPDATE_USER_DATA,
        propToUpdate, 
        newData
    }
}

export const resetApp = () => {
    return {
        type: RESET_APP
    }
}