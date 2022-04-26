/* import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createWrapper } from 'next-redux-wrapper';
import reducer from './reducers';

const middleware = [thunk];

const makeStore = (initialState = {}) =>
	createStore(reducer, initialState, compose(applyMiddleware(...middleware)));

export const wrapper = createWrapper(makeStore); */

/* import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';


export const initStore = (initialState = {}) => {
  return createStore(reducer, initialState, applyMiddleware(thunk));
}; */

/* import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createWrapper } from 'next-redux-wrapper';
import rootReducer from './reducers/rootReducer';

const middleware = [thunk];

const makeStore = () => createStore(rootReducer, compose(applyMiddleware(...middleware)));

export const wrapper = createWrapper(makeStore); */
