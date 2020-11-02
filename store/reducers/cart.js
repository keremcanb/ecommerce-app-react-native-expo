/* eslint-disable no-case-declarations */
/* eslint-disable default-case */
import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart';
import { ADD_ORDER } from '../actions/orders';
import CartItem from '../../models/cart-item';
import { DELETE_PRODUCT } from '../actions/products';

const initialState = {
  items: {},
  totalAmount: 0
};

export default (state = initialState, action) => {
  const { type, product } = action;

  switch (type) {
    case ADD_TO_CART:
      const addedProduct = product;
      const { id, title, price } = addedProduct;

      const productPrice = price;
      const productTitle = title;

      let updatedOrNewCartItem;

      if (state.items[id]) {
        // Already item in cart, update existing item
        updatedOrNewCartItem = new CartItem(
          state.items[id].quantity + 1,
          productPrice,
          productTitle,
          state.items[id].sum + productPrice
        );
      } else {
        // Add new item
        updatedOrNewCartItem = new CartItem(
          1,
          productPrice,
          productTitle,
          productPrice
        );
      }
      return {
        ...state,
        items: { ...state.items, [id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + productPrice
      };
  }

  return state;
};
