import {
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT
} from '../../constants/ReduxConstants';

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch) => {
    // any async code you want!
    const response = await fetch('https://expo-shop-7adf6.firebaseio.com/', {
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
    });

    const resData = await response.json();

    console.log(resData);

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
  return {
    type: UPDATE_PRODUCT,
    pid: id,
    productData: { title, description, imageUrl }
  };
};

export const deleteProduct = (productId) => {
  return { type: DELETE_PRODUCT, pid: productId };
};
