import PRODUCTS from '../../data/dummy-data';
// import {
//   DELETE_PRODUCT,
//   CREATE_PRODUCT,
//   UPDATE_PRODUCT
// } from '../actions/products';
// import Product from '../../models/product';

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => product.ownerId === 'u1')
};

export default (state = initialState) => {
  // switch (action.type) {
  // }
  return state;
};
