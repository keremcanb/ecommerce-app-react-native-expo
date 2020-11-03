import PRODUCTS from '../../data/dummy-data';
// import {
//   CREATE_PRODUCT,
//   UPDATE_PRODUCT,
//   DELETE_PRODUCT
// } from '../../constants/ReduxConstants';
// import Product from '../../models/product';

const initialState = {
  allProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => product.ownerId === 'u1')
};

export default (state = initialState) => {
  // switch (action.type) {
  // }
  return state;
};
