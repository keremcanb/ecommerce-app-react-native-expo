/* eslint-disable import/prefer-default-export */
import { ADD_TO_CART, REMOVE_FROM_CART } from '../../constants/ReduxConstants';

export const addToCart = (product) => {
  return { type: ADD_TO_CART, product };
};
