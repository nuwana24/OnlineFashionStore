import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from 'react-router-dom';

import configureStore from './UserComponents/store/store';
import { Provider } from 'react-redux';

let preloadedState = {};
const store = configureStore(preloadedState);

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
window.getState = store.getState;
serviceWorker.unregister();