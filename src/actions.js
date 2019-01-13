import { 
    LOAD_USER_DATA,
    ON_ROUTE_CHANGE,
    SIGN_IN_USER,
    ON_INPUT_CHANGE,
    UPDATE_IMAGE_URL,
    RESET_IMAGE_DATA,
    CHANGE_ERROR_MESSAGE,
    DISPLAY_FACE_BOXES,
    UPDATE_USER_DATA,
    RESET_APP
 } from './constants.js';


export const loadUserData = (data) => {
    return {
        type: LOAD_USER_DATA,
        data
    }
}


export const onRouteChange = (route) => {
    return {
        type: ON_ROUTE_CHANGE,
        route
    }
}


export const signInUser = () => {
    return {
        type: SIGN_IN_USER
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