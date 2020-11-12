import { AUTHENTICATE, LOGOUT } from '../../constants/ReduxConstants';

const initialState = {
  token: null,
  userId: null
};

export default (state = initialState, action) => {
  const { type, token, userId } = action;

  switch (type) {
    case AUTHENTICATE:
      return {
        token,
        userId
      };

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};
