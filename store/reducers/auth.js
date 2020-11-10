import { AUTHENTICATE } from '../../constants/ReduxConstants';

const initialState = {
  token: null,
  suerId: null
};

export default (state = initialState, action) => {
  const { type, token, userId } = action;

  switch (type) {
    case AUTHENTICATE:
      return {
        token,
        userId
      };

    default:
      return state;
  }
};
