import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './store/reducers';

// const initialState = {};

const store = createStore(rootReducer, composeWithDevTools());

export default store;
