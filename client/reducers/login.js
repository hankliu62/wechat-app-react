import { LOGIN_MIAN_SET } from '../constants/ActionTypes';

const defaultStatus = {
  content: 'Login Page Content'
};

export default (state = { ...defaultStatus }, action) => {
  switch (action.type) {
    case LOGIN_MIAN_SET:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
