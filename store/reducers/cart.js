/* eslint-disable no-case-declarations */
/* eslint-disable default-case */
import { ADD_TO_CART, REMOVE_FROM_CART } from '../../constants/ReduxConstants';
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

      // New or updated cart item
      let cartItem;
      // Update items in cart
      if (state.items[id]) {
        // Update individual qty & sum
        cartItem = new CartItem(
          state.items[id].qty + 1,
          productPrice,
          productTitle,
          state.items[id].sum + productPrice
        );
        // Add new item to cart
      } else {
        // qty, price, title, sum
        cartItem = new CartItem(1, productPrice, productTitle, productPrice);
      }
      return {
        ...state,
        // Override added item with updated cart item
        items: { ...state.items, [id]: cartItem },
        // Total amount
        totalAmount: state.totalAmount + productPrice
      };

    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.pid];

      const currentQty = selectedCartItem.quantity;

      let updatedCartItems;

      // Need to reduce, not delete
      if (currentQty > 1) {
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
        );
        updatedCartItems = { ...state.items, [action.pid]: updatedCartItem };
        // Delete
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.pid];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice
      };
  }

  return state;
};
