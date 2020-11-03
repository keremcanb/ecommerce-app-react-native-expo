/* eslint-disable no-case-declarations */
/* eslint-disable default-case */
import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart';
// import { ADD_ORDER } from '../actions/orders';
import CartItem from '../../models/cart-item';
// import { DELETE_PRODUCT } from '../actions/products';

const initialState = {
  items: {},
  totalAmount: 0
};

export default (state = initialState, action) => {
  const { type, product } = action;

  switch (type) {
    case ADD_TO_CART:
      const addedProduct = product;
      const { id, title: productTitle, price: productPrice } = addedProduct;

      let cartItem;

      // Items in cart, update existing items
      if (state.items[id]) {
        cartItem = new CartItem(
          state.items[id].qty + 1,
          productPrice,
          productTitle,
          state.items[id].sum + productPrice
        );
        // Cart empty, add new item
      } else {
        cartItem = new CartItem(1, productPrice, productTitle, productPrice);
      }

      return {
        ...state,
        items: { ...state.items, [id]: cartItem },
        totalAmount: state.totalAmount + productPrice
      };
  }

  return state;
};
