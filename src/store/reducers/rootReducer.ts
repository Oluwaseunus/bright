import { combineReducers } from 'redux';
import auth from './auth';
import shapes from './shapes';
import colours from './colours';

export default combineReducers({
  auth,
  shapes,
  colours,
});
