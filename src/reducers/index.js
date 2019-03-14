import { combineReducers } from 'redux';

import pockets from './pockets';
import prices from './prices';
import ui from './ui';

export default combineReducers({
  pockets,
  prices,
  ui,
});
