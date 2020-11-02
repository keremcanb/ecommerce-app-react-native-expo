import React, { useState } from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
// import { AppLoading } from 'expo';
// import * as Font from 'expo-font';
import { enableScreens } from 'react-native-screens';

import productsReducer from './store/reducers/products';
// import cartReducer from './store/reducers/cart';
// import ordersReducer from './store/reducers/orders';
import ShopNavigator from './navigation/ShopNavigator';

enableScreens();

const rootReducer = combineReducers({
  products: productsReducer
});

const store = createStore(rootReducer);

const App = () => {
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
};

export default App;
