import { 
    LOAD_USER_DATA,
    ON_ROUTE_CHANGE,
    ON_INPUT_CHANGE,
    UPDATE_IMAGE_URL,
    CHANGE_ERROR_MESSAGE,
    DISPLAY_FACE_BOXES,
    ON_IMAGE_RESET,
    UPDATE_AVATAR_URL
} from './constants.js';

import { storeUserData, updateUserData, removeUserData } from './helpers';

const initialState = {
    input: '',
    imageUrl: '',
    imageDetectionError: '',
    faceBoxes: [],
    route: 'signin',
    isSignedIn: false,
}

const userInitialState = {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
    avatar: ''
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
        case ON_IMAGE_RESET:
            return Object.assign({}, state, { input: '', faceBoxes: [], imageUrl: '', imageDetectionError: '' });
        default: 
            return state;
        }
}

  export const changeUserData = (state=userInitialState, action={}) => {
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
            case UPDATE_AVATAR_URL:
                // update avatar url in local storage:
                updateUserData('user', 'avatar', action.url);
    
                return Object.assign({}, state, { avatar: action.url });
            default: 
                return state;
    }
}

export const routeReducer = (state=initialState, action={}) => {
    switch (action.type) {
        case ON_ROUTE_CHANGE:
            if (action.route === 'home') {
                return Object.assign({}, state, {route: action.route, isSignedIn: true});
            } else if (action.route === 'signin') {
                removeUserData('user');
                return Object.assign({}, state, {route: action.route, isSignedIn: false});
            }
            return Object.assign({}, state, {route: action.route, isSignedIn: true});
                    
        default: 
            return state;
    }
}