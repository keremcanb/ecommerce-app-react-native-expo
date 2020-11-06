import {
  // CREATE_PRODUCT,
  // UPDATE_PRODUCT,
  DELETE_PRODUCT
} from '../../constants/ReduxConstants';

export const createProduct = (productId) => {
  return { type: CREATE_PRODUCT, pid: productId };
};

// export const updateProduct = (productId) => {
//   return { type: UPDATE_PRODUCT, pid: productId };
// };

// export const deleteProduct = (productId) => {
//   return { type: DELETE_PRODUCT, pid: productId };
// };
