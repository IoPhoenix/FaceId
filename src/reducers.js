import { 
    SEND_USER_DATA_SUCCESS,
    UPDATE_USER_DATA_SUCCESS,
    FETCH_REQUEST_FAILURE,
    LOAD_USER_DATA,
    ON_ROUTE_CHANGE,
    ON_INPUT_CHANGE,
    UPDATE_IMAGE_URL,
    CHANGE_ERROR_MESSAGE,
    DISPLAY_FACE_BOXES,
    RESET_IMAGE_DATA,
    UPDATE_USER_DATA
} from './constants.js';

import { storeUserData, updateUserData } from './helpers';

const initialState = {
    input: '',
    imageUrl: '',
    faceBoxes: []
}

const userInitialState = {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
    avatar: '',
    message: '',
    route: 'signin',
    isSignedIn: false
}


export const imageReducer = (state=initialState, action={}) => {
    switch (action.type) {
        case ON_INPUT_CHANGE:
            return Object.assign({}, state, { input: action.input });
        case UPDATE_IMAGE_URL:
            return Object.assign({}, state, { imageUrl: action.url });
        case DISPLAY_FACE_BOXES:
            return Object.assign({}, state, { faceBoxes: action.boxes });
        case RESET_IMAGE_DATA:
            return Object.assign({}, state, { input: '', faceBoxes: [], imageUrl: '' });
        default: 
            return state;
        }
}



export const userReducer = (state=userInitialState, action={}) => {
    switch (action.type) {
        case SEND_USER_DATA_SUCCESS:
            // if user exists, proceed
            if (action.data.id) {
                // save user data in local storage:
                storeUserData('user', action.data);

                // return new state with user details:
                return Object.assign({}, state, {
                    id: action.data.id,
                    name: action.data.name,
                    email: action.data.email,
                    entries: action.data.entries,
                    joined: action.data.joined,
                    avatar: action.data.avatar,
                    message: '',
                    route: 'home',
                    isSignedIn: true
                });
            } else {
                return Object.assign({}, state, { message: action.data });
            }

        case UPDATE_USER_DATA_SUCCESS:
            console.log('Reponse from server: ', action.data);

            if (action.data.message) {

                // update user info in local storage:
                updateUserData('user', action.data.target, action.data.response[0]);

                // return new updated state:
                return Object.assign({}, state, { 'message': action.data.message, [action.data.target]: action.data.response[0]});
            } else {
                return Object.assign({}, state, { message: 'Something went wrong. Please try again later' });
            }


        case FETCH_REQUEST_FAILURE:
            console.log('action.error: ', action.error);
            return Object.assign({}, state, { message: 'Something went wrong. Please try again later' });

        case ON_ROUTE_CHANGE:
            return Object.assign({}, state, {route: action.route});

        case UPDATE_USER_DATA: 
            // update user info in local storage for further session:
            updateUserData('user', action.propToUpdate, action.newData);

            return Object.assign({}, state, { [action.propToUpdate]: action.newData });
        case LOAD_USER_DATA: 
            return Object.assign({}, state, {
                id: action.data.id,
                name: action.data.name,
                email: action.data.email,
                entries: action.data.entries,
                joined: action.data.joined,
                avatar: action.data.avatar,
                message: '',
                route: 'home',
                isSignedIn: true
            });
        case CHANGE_ERROR_MESSAGE:
            return Object.assign({}, state, { message: action.message }); 
        default: 
            return state;
    }
}