import { 
    REQUEST_ENTRIES_SUCCESS,
    REQUEST_ENTRIES_FAILED
} from './constants.js';


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

// export const searchRobots = (state=initialStateSearch, action={}) => {
//     switch(action.type) {
//         case CHANGE_SEARCH_FIELD:
//             return Object.assign({}, state, {searchField: action.payload});
//         default: 
//             return state;
//     }
// }

export const entriesReducer = (state=initialState, action={}) => {
    switch (action.type) {

        case REQUEST_ENTRIES_SUCCESS:
            return Object.assign({}, state.user, { entries: action.count});
        case REQUEST_ENTRIES_FAILED:
            console.log(action.error);
            return Object.assign({}, state, { imageDetectionError: 'Cannot process this image'});
        default: 
            return state;
    }
}