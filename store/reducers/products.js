import PRODUCTS from '../../data/dummy-data';
import {
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  SET_PRODUCTS
} from '../../constants/ReduxConstants';
import Product from '../../models/product';

const initialState = {
  allProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === 'u1')
};

export default (state = initialState, action) => {
  const { type, pid, productData, products } = action;

  switch (type) {
    case SET_PRODUCTS:
      return {
        allProducts: products,
        userProducts: products
      };

    case CREATE_PRODUCT:
      const newProduct = new Product(
        new Date().toString(),
        'u1',
        productData.title,
        productData.imageUrl,
        productData.description,
        productData.price
      );

      return {
        ...state,
        allProducts: state.allProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct)
      };

    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        (production) => production.id === pid
      );

      const updatedProduct = new Product(
        pid,
        state.userProducts[productIndex].ownerId,
        productData.title,
        productData.imageUrl,
        productData.description,
        state.userProducts[productIndex].price
      );

      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updatedProduct;

      const allProductIndex = state.allProducts.findIndex(
        (production) => production.id === pid
      );

      const updatedAvailableProducts = [...state.allProducts];
      updatedAvailableProducts[allProductIndex] = updatedProduct;

      return {
        ...state,
        allProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts
      };

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
