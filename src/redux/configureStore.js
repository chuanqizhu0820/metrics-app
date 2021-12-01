import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import dataReducer from './app';

const reducer = combineReducers({
  dataReducer
});

const store = createStore(
  reducer,
  applyMiddleware(thunk, logger),
);

export default store;
