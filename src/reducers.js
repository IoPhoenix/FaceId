import { 
    LOAD_USER_DATA,
    ON_ROUTE_CHANGE,
    ON_INPUT_CHANGE,
    UPDATE_IMAGE_URL,
    CHANGE_ERROR_MESSAGE,
    DISPLAY_FACE_BOXES,
    ON_IMAGE_RESET
} from './constants.js';

import { storeUserData, removeUserData } from './helpers';

const initialState = {
    input: '',
    imageUrl: '',
    imageDetectionError: '',
    faceBoxes: [],
    route: 'signin',
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: '',
      avatarUrl: ''
    }
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

  export const registerReducer = (state=initialState, action={}) => {
        switch (action.type) {
            case LOAD_USER_DATA:
                // save user data in local storage:
                storeUserData('user', action.data);

                // return new state with user details:
                return Object.assign({}, state, {
                    user: {
                        id: action.data.id,
                        name: action.data.name,
                        email: action.data.email,
                        entries: action.data.entries,
                        joined: action.data.joined,
                        avatarUrl: action.data.avatar
                    }});
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