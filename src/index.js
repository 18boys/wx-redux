/**
 * @file wx-redux
 * @author shuai.li
 */

import { proxyPage } from './utils';

const _Page = Page;
let Store;

const _app=App;
App=(config)=>{
  if(!config.store){
    throw new Error('请在App中初始化一个store!!!')
  }
  Store=config.store;
  return _app(config)
};

function processNewConfig(config){
  let newConfig=config;
  newConfig.data = config.data||{};
  // 映射states
  let states=[];
  const state = Store.getState();
  if(config.states){
    states= config.states.reduce((pre,item)=> {
      if(!state.hasOwnProperty(item)){
        throw  new Error(`states 中没有定义${item}`)
      }
      return {
        ...pre,
        [item]: state[item],
      }
    },{})
  }
  newConfig.data={
    ...config.data,
    ...states,
  };

  // 映射action
  if(config.actions){
    const {dispatch} = Store;
    // todo 判断action是否为函数
    config.actions.map((action)=>{
      newConfig[action.name]=function (...args){
        dispatch(action.apply(null,args))
      }
    });
  }
  return newConfig;
}

function setSubscribe(options, config){
  // 在此处订阅所有变化,并根据变化更新页面
  const { subscribe } = Store;
  subscribe(()=>{
    // todo 在这里可以做diff,然后确定到底需要更新那个页面的那个部分
    // 此处有性能优化的两个点: 1.json-diff 2.不正在显示的页面不更新state
    const { getState } = Store;
    const newState = getState();
    const updateObj={};
    // todo 此处可以做优化,让用户可以按照 a.b.c.d类似的方式来更新state
    config.states.forEach((s)=>{
      updateObj[s]=newState[s]
    });
    // 此处的this实际上指向是 Page对象
    this.setData(updateObj)
  });
}

Page = (config) => {
  const newConfig = processNewConfig(config);
  proxyPage(newConfig, 'onLoad', setSubscribe);
  _Page(newConfig);
};
