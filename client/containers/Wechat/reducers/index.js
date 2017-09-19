import { combineReducers } from 'redux';

import chat from './chat';
import contact from './contact';
import personal from './self';
import newFriends from './new-friends';
import addFriend from './add-friend';

export default combineReducers({
  chatMain: chat,
  contactMain: contact,
  selfMain: personal,
  newFriendsMain: newFriends,
  addFriendMain: addFriend
});
