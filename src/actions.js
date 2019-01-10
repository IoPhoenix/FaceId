import { 
    LOAD_USER_DATA,
    ON_ROUTE_CHANGE,
    ON_INPUT_CHANGE,
    UPDATE_IMAGE_URL,
    ON_IMAGE_RESET,
    ON_SELFIE_SUBMIT,
    CHANGE_ERROR_MESSAGE,
    DISPLAY_FACE_BOXES
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

export const onImageReset = () => {
    return {
        type: ON_IMAGE_RESET,
    }
}

export const onSelfieSubmit = (input) => {
    return {
        type: ON_SELFIE_SUBMIT,
        input: input
    }
}