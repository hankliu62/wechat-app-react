import { HOMEPAGE_MAIN_SET } from '../constants/ActionTypes';

const defaultState = {
  content: 'Init Redux Data'
};

export default (state = { ...defaultState }, action) => {
  switch (action.type) {
    case HOMEPAGE_MAIN_SET:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
