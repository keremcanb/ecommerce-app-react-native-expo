/* eslint-disable import/prefer-default-export */
import { ADD_ORDER } from '../../constants/ReduxConstants';

export const addOrder = (cartItems, totalAmount) => {
  return {
    type: ADD_ORDER,
    orderData: { items: cartItems, amount: totalAmount }
  };
};
