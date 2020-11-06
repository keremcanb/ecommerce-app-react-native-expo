import {
  // CREATE_PRODUCT,
  // UPDATE_PRODUCT,
  DELETE_PRODUCT
} from '../../constants/ReduxConstants';

// export const createProduct = (productId) => {
//   return { type: CREATE_PRODUCT};
// };

// export const updateProduct = (productId) => {
//   return { type: UPDATE_PRODUCT};
// };

export const deleteProduct = (productId) => {
  return { type: DELETE_PRODUCT, pid: productId };
};
