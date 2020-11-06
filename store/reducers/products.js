import PRODUCTS from '../../data/dummy-data';
import {
  // CREATE_PRODUCT,
  // UPDATE_PRODUCT,
  DELETE_PRODUCT
} from '../../constants/ReduxConstants';
import Product from '../../models/product';

const initialState = {
  allProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => product.ownerId === 'u1')
};

export default (state = initialState, action) => {
  const { type, pid } = action;

  switch (type) {
    // case CREATE_PRODUCT:
    //   return {};

    // case UPDATE_PRODUCT:
    //   return {};

    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (product) => product.id !== pid
        ),
        allProducts: state.allProducts.filter((product) => product.id !== pid)
      };
  }
  return state;
};
