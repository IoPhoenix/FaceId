import { 
    LOAD_USER_DATA,
    ON_ROUTE_CHANGE,
    ON_INPUT_CHANGE,
    UPDATE_IMAGE_URL,
    CHANGE_ERROR_MESSAGE,
    DISPLAY_FACE_BOXES,
    RESET_IMAGE_DATA,
    UPDATE_USER_DATA,
    DELETE_USER_DATA
} from './constants.js';

import { storeUserData, updateUserData, removeUserData } from './helpers';

const initialState = {
    input: '',
    imageUrl: '',
    imageDetectionError: '',
    faceBoxes: []
}

const userInitialState = {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
    avatar: ''
}

const routeAndAuthState = {
    route: 'signin',
    isSignedIn: false
}

  export const imageReducer = (state=initialState, action={}) => {
    switch (action.type) {
        case ON_INPUT_CHANGE:
            return Object.assign({}, state, { input: action.input });
        case UPDATE_IMAGE_URL:
            return Object.assign({}, state, { imageUrl: action.url });
        case CHANGE_ERROR_MESSAGE:
            return Object.assign({}, state, { imageDetectionError: action.message });
        case DISPLAY_FACE_BOXES:
            return Object.assign({}, state, { faceBoxes: action.boxes });
        case RESET_IMAGE_DATA:
            return Object.assign({}, state, { input: '', faceBoxes: [], imageUrl: '', imageDetectionError: '' });
        default: 
            return state;
        }
}



  export const userReducer = (state=userInitialState, action={}) => {
        switch (action.type) {
            case LOAD_USER_DATA:
                // save user data in local storage:
                storeUserData('user', action.data);

                // return new state with user details:
                return Object.assign(state, {
                    id: action.data.id,
                    name: action.data.name,
                    email: action.data.email,
                    entries: action.data.entries,
                    joined: action.data.joined,
                    avatar: action.data.avatar
                });
            case UPDATE_USER_DATA: 
                // update user info in local storage for further session:
                updateUserData('user', action.propToUpdate, action.newData);

                return Object.assign({}, state, { [action.propToUpdate]: action.newData });
            case DELETE_USER_DATA:
                // remove user data from local storage:
                removeUserData('user');
                
                // reset user state completely:
                return Object.assign({}, state, { id: '', name: '', email: '', entries: 0, joined: '', avatar: '' });
            default: 
                return state;
    }
}

export const routeReducer = (state=routeAndAuthState, action={}) => {
    switch (action.type) {
        case ON_ROUTE_CHANGE:
            if (action.route === 'home') {
                return Object.assign({}, state, {route: action.route, isSignedIn: true});
            } else if (action.route === 'signin') {
                // remove all user data from local storage:
                removeUserData('user');
                return Object.assign({}, state, {route: action.route, isSignedIn: false});
            }
            return Object.assign({}, state, {route: action.route, isSignedIn: true});
                    
        default: 
            return state;
    }
}