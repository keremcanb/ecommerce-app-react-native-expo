import {
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  SET_PRODUCTS
} from '../../constants/ReduxConstants';
import Product from '../../models/product';

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        'https://expo-shop-7adf6.firebaseio.com/products.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const resData = await response.json();

      const loadedProducts = [];

      for (const key in resData)
        loadedProducts.push(
          new Product(
            key,
            'u1',
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );

      dispatch({ type: SET_PRODUCTS, products: loadedProducts });
    } catch (err) {
      throw err;
    }
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const response = await fetch(
      `https://expo-shop-7adf6.firebaseio.com/products.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price
        })
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price
      }
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const response = await fetch(
      `https://expo-shop-7adf6.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl
        })
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong');
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: { title, description, imageUrl }
    });
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const response = await fetch(
      `https://expo-shop-7adf6.firebaseio.com/products/${productId}.json?auth=${token}`,
      {
        method: 'DELETE'
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong');
    }

    dispatch({ type: DELETE_PRODUCT, pid: productId });
  };
};
