import { createStore, applyMiddleware } from 'redux';
import {logger} from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import rootReducer from './rootReducer.js';
const middleware = applyMiddleware(thunk, logger, promise);
const store = createStore(rootReducer, middleware);
export default store;
