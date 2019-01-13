import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import './index.css';
import App from './containers/App';
import {
    routeReducer, 
    userReducer, 
    imageReducer,
} from './reducers';
import registerServiceWorker from './registerServiceWorker';
import 'tachyons';

// use middleware between action and reducer:
const logger = createLogger();
const appReducer = combineReducers({routeReducer, userReducer, imageReducer});


// create a wrapping root reducer 
// that will handle reset for each reducer
const rootReducer = (state, action) => {

    // change the state reference to undefined
    // so that the default state applies and 
    // the state is thus reset
    if (action.type === 'RESET_APP') {
      state = undefined;
    }
  
    return appReducer(state, action);
  }

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));
   

registerServiceWorker();
