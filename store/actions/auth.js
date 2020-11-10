import { AsyncStorage } from 'react-native';
import { AUTHENTICATE } from '../../constants/ReduxConstants';

export const authenticate = (userId, token) => {
  return { type: AUTHENTICATE, userId, token };
};

export const signUp = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB1s_wKYIxH7LBudCUJDYn8q7yJKCvwthk',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_EXISTS') {
        message = 'This email exists already!';
      }
      throw new Error(message);
    }

    const resData = await response.json();
    const { localId, idToken, expiresIn } = resData;

    dispatch(authenticate(localId, idToken));

    const expirationDate = new Date(
      new Date().getTime() + parseInt(expiresIn) * 1000
    );

    saveDataToStorage(idToken, localId, expirationDate);
  };
};

export const signIn = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB1s_wKYIxH7LBudCUJDYn8q7yJKCvwthk',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'This email could not be found!';
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'This password is not valid!';
      }
      throw new Error(message);
    }

    const resData = await response.json();
    const { localId, idToken, expiresIn } = resData;

    dispatch(authenticate(localId, idToken));

    const expirationDate = new Date(
      new Date().getTime() + parseInt(expiresIn) * 1000
    );

    saveDataToStorage(idToken, localId, expirationDate);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token,
      userId,
      expiryDate: expirationDate.toISOString()
    })
  );
};
