import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import products from './reducers/products';
import cart from './reducers/cart';
import orders from './reducers/orders';

const rootReducer = combineReducers({
  products,
  cart,
  orders
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
