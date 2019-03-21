import { combineReducers } from '../lib/redux';
import {title} from './title.js';

const app = combineReducers({
  title,
});

export default app
