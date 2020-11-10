import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import products from './reducers/products';
import cart from './reducers/cart';
import orders from './reducers/orders';
import auth from './reducers/auth';

const middleware = [thunk];

const rootReducer = combineReducers({
  products,
  cart,
  orders,
  auth
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
