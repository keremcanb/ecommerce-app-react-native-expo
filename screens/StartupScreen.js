import React, { useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import { useDispatch } from 'react-redux';
import Loader from '../components/UI/Loader';
import { authenticate } from '../store/actions/auth';

const StartupScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');

      if (!userData) {
        navigation.navigate('Auth');
        return;
      }

      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformedData;

      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        navigation.navigate('Auth');
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();

      navigation.navigate('Shop');

      dispatch(authenticate(userId, token, expirationTime));
    };

    tryLogin();
  }, [dispatch]);

  return <Loader />;
};

export default StartupScreen;
