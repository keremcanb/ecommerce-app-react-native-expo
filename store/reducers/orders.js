import { ADD_ORDER } from '../actions/orders';
import Order from '../../models/order';

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
  }

  return state;
};
