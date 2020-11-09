import { ADD_ORDER, SET_ORDERS } from '../../constants/ReduxConstants';
import Order from '../../models/order';

const initialState = {
  orders: []
};

export default (state = initialState, action) => {
  const { type, orderData, orders } = action;

  switch (type) {
    case SET_ORDERS:
      return {
        orders
      };

    case ADD_ORDER:
      const newOrder = new Order(
        orderData.id,
        orderData.items,
        orderData.amount,
        orderData.date
      );

      return {
        ...state,
        orders: state.orders.concat(newOrder)
      };
  }

  return state;
};
