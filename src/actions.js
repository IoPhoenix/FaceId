import { 
    DATABASE_LINK,
    REQUEST_ENTRIES_SUCCESS,
    REQUEST_ENTRIES_FAILED
 } from './constants.js';

// export const onInputChange = (text) => {
//     return {
//         type: ON_INPUT_CHANGE,
//         payload: text
//     }
// }

// since function is being returned, not an object, use redux-thunk middleware:
export const changeNumberOfEntries = (userId) => (dispatch) => {
    fetch(`${DATABASE_LINK}/image`, {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          id: userId
        })
    })
    .then(response => response.json())
    .then(count => dispatch({ type: REQUEST_ENTRIES_SUCCESS, payload: count }))
    .catch(error => dispatch({ type: REQUEST_ENTRIES_FAILED, payload: error }));
}