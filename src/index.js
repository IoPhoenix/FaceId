import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
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
const rootReducer = combineReducers({routeReducer, userReducer, imageReducer});
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));
   

registerServiceWorker();
