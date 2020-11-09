/* eslint-disable import/prefer-default-export */
import { ADD_ORDER } from '../../constants/ReduxConstants';

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch) => {
    const date = new Date();

    const response = await fetch(
      'https://expo-shop-7adf6.firebaseio.com/orders/u1.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: new Date().toISOString
        })
      }
    );

    const resData = await response.json();

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items: cartItems,
        amount: totalAmount,
        date
      }
    });
  };
};
