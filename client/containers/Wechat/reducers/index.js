import { combineReducers } from 'redux';

import chat from './chat';
import contact from './contact';
import personal from './self';

export default combineReducers({
  chat,
  contact,
  personal
});
