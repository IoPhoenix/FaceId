import { 
    SEND_USER_DATA_SUCCESS,
    UPDATE_USER_DATA_SUCCESS,
    FETCH_REQUEST_FAILURE,
    LOAD_USER_DATA,
    ON_ROUTE_CHANGE,
    ON_INPUT_CHANGE,
    UPDATE_IMAGE_URL,
    RESET_IMAGE_DATA,
    CHANGE_ERROR_MESSAGE,
    DISPLAY_FACE_BOXES,
    UPDATE_USER_DATA,
    RESET_APP
 } from './constants.js';
 
import sendDataApi from './api/sendDataApi';
import updateDataApi from './api/updateDataApi';



export const sendUserData = (dataToSend, action) => (dispatch) => {
    return sendDataApi.sendUserData(dataToSend, action)
        .then(data => {
            dispatch(sendUserDataSuccess(data));
        })
        .catch(error => {
            dispatch(fetchRequestFailure(error));
        });
}


export const updateUserData = (dataToSend, action) => (dispatch) => {
    return updateDataApi.updateUserData(dataToSend, action)
        .then(data => {
            dispatch(updateUserDataSuccess(data));
        })
        .catch(error => {
            dispatch(fetchRequestFailure(error));
        });
}

export function sendUserDataSuccess(data) {  
    return {
        type: SEND_USER_DATA_SUCCESS,
        data
    };
}

export function updateUserDataSuccess(data) {  
    return {
        type: UPDATE_USER_DATA_SUCCESS,
        data
    };
  }


export function fetchRequestFailure(error) {  
    return {
        type: FETCH_REQUEST_FAILURE,
        error
    };
}


export const onRouteChange = (route) => {
    return {
        type: ON_ROUTE_CHANGE,
        route
    }
}


export const loadUserData = (data) => {
    return {
        type: LOAD_USER_DATA,
        data
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