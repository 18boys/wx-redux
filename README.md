# wx-redux 微信小程序状态管理工具

##### 小程序接入redux,实际使用代码参见:[Demo](https://github.com/18boys/wx-redux/tree/master/examples/)

## 一.使用步骤
1.将此工程/dist下的 redux.js,wx-redux.js文件复制到你的/lib下
2.编写reduce文件,比如下面的例子
```js
import { combineReducers } from '../lib/redux';

const title = (state='title', action) => {
  switch (action.type) {
    case 'UPDATE_TITLE':
      return action.payLoad;
    default:
      return state
  }
};

const app = combineReducers({
  title,
});

export default app

```
3.在app.js中引入store
```js
import './lib/wx-redux';
import { createStore } from './lib/redux';
import reducers from "./reducers/index";

const store = createStore(reducers);

App({
  store,
});
```

4.编写action
```js
# /actions/index.js
export const updateTitle=(title) => ({
  type: 'UPDATE_TITLE',
  payLoad: title,
});

```
5.在page的代码中引入你要使用state以及action
```js

# 引入action文件
import {updateTitle} from '../../actions/index';
Page({
  data:{
    a:'aaa',
  },
  actions:[updateTitle],  # 引入需要直接调用的action
  states:['title'], # 引入需要直接使用的state中的值
  onLoad(){},
  bindKeyInput(e){
    const text =e.detail.value;
    this.updateTitle(text);   # 直接调用action来更新store
  }
});
```

6.直接调用action来更新store
```js
bindKeyInput(e){
    const text =e.detail.value;
    this.updateTitle(text);
  }
```

## 原理
