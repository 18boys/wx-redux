import { combineReducers } from '../lib/redux';
import {title} from './title.js';
import {count} from './count.js';

const app = combineReducers({
  title,
  count,
});

export default app
