import { 
    LOAD_USER_DATA,
    ON_ROUTE_CHANGE
 } from './constants.js';


export const loadUserData = (data) => {
    return {
        type: LOAD_USER_DATA,
        data: data
    }
}

export const onRouteChange = (route) => {
    return {
        type: ON_ROUTE_CHANGE,
        route: route
    }
}