import {
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT
} from '../../constants/ReduxConstants';

export const deleteProduct = (productId) => {
  return { type: DELETE_PRODUCT, pid: productId };
};
