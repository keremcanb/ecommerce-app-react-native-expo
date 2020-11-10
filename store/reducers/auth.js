import { SIGN_UP, SIGN_IN } from '../../constants/ReduxConstants';

const initialState = {
  token: null,
  suerId: null
};

export default (state = initialState, action) => {
  const { type, token, userId } = action;

  switch (type) {
    case SIGN_IN:
    case SIGN_UP:
      return {
        token,
        userId
      };

    default:
      return state;
  }
};
