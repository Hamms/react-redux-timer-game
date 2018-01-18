import { combineReducers } from 'redux';
import general from './general';
import team from './team';

export default combineReducers({
  general,
  team,
})
