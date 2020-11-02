import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { enableScreens } from 'react-native-screens';
// import { AppLoading } from 'expo';
// import * as Font from 'expo-font';

import store from './store/store';
import ShopNavigator from './navigation/ShopNavigator';

enableScreens();

const App = () => {
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
};

export default App;
