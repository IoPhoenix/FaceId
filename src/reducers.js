import { 
    LOAD_USER_DATA,
    ON_ROUTE_CHANGE
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


  export const registerReducer = (state=initialState, action={}) => {
        switch (action.type) {
            case LOAD_USER_DATA:
                return Object.assign({}, state.user, {
                        id: action.data.id,
                        name: action.data.name,
                        email: action.data.email,
                        entries: action.data.entries,
                        joined: action.data.joined,
                        avatarUrl: action.data.avatar
                      });
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
                return Object.assign({}, state, {route: action.route, isSignedIn: false});
            }
            return Object.assign({}, state, {route: action.route, isSignedIn: true});
                    
        default: 
            return state;
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

// export const entriesReducer = (state=initialState, action={}) => {
//     switch (action.type) {

//         case REQUEST_ENTRIES_SUCCESS:
//             return Object.assign({}, state.user, { entries: action.count});
//         case REQUEST_ENTRIES_FAILED:
//             console.log(action.error);
//             return Object.assign({}, state, { imageDetectionError: 'Cannot process this image'});
//         default: 
//             return state;
//     }
// }