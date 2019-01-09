import { 
    LOAD_USER_DATA,
    ON_ROUTE_CHANGE
 } from './constants.js';


export const loadUserData = (data) => {
    return {
        type: LOAD_USER_DATA,
        payload: data
    }
}

export const onRouteChange = (route) => {
    return {
        type: ON_ROUTE_CHANGE,
        route: route
    }
}

// since function is being returned, not an object, use redux-thunk middleware:
// export const changeNumberOfEntries = (userId) => (dispatch) => {
//     fetch(`${DATABASE_LINK}/image`, {
//         method: 'put',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//           id: userId
//         })
//     })
//     .then(response => response.json())
//     .then(count => dispatch({ type: REQUEST_ENTRIES_SUCCESS, payload: count }))
//     .catch(error => dispatch({ type: REQUEST_ENTRIES_FAILED, payload: error }));
// }