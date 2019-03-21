import './lib/wx-redux';
import { createStore } from './lib/redux';
import reducers from "./reducers/index";

const store = createStore(reducers);

App({
  store,
});
