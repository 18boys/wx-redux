/**
 * @file index
 * @author shuai.li
 */

import reducer from '../G';
const {createStore} = require('redux.js');
const store = createStore(reducer);

// 重写 aPP
const _App=App;

App=(config)=>{
  const newConfig ={
    ...config,
    store
  }
  return _App(newConfig)
}

const {getState,dispatch,subscribe} =store;

subscribe(()=>{
  console.log(getState())
})
const state =getState();
const _Page = Page;

function processNewConfig(config){
  let newConfig=config;
  newConfig.data = config.data||{};

  // 映射states
  let states=[];
  if(config.states){
    states=config.states.reduce((pre,item)=> {
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

    // todo 判断action是否为函数
    config.actions.map((action)=>{
      newConfig[action.name]=function (...args){
        dispatch(action.apply(null,args))
      }
    });
  }
  return newConfig;
}

const proxyPage = function (config, methodName, hookMethod) {
  if (config[methodName]) {
    const oldMethod = config[methodName];
    config[methodName] = function (options) {
      hookMethod.call(this, options, config);
      oldMethod.call(this, options)
    };
    return;
  }
  config[methodName] = function (options) {
    hookMethod.call(this, options, config)
  }
};

// z在此方法中才拿到this, 然后才可以调用  setData
function setSubscribe(options, config){
  // 在此处订阅所有变化,并根据变化更新页面
  subscribe(()=>{
    // todo 在这里可以做diff,然后确定到底需要更新那个页面的那个部分
    // 此处有性能优化的两个点: 1.json-diff 2.不正在显示的页面不更新state
    const newState = getState();
    const updateObj={};
    // todo 此处可以做优化,让用户可以按照 a.b.c.d类似的方式来更新state
    config.states.forEach((s)=>{
      updateObj[s]=newState[s]
    });
    // _Page.prototype.setData.call(newConfig,{
    //   ...updateObj,
    // })
    this.setData(updateObj)
  });
}

Page = (config) => {
  const newConfig = processNewConfig(config)
  proxyPage(newConfig, 'onLoad', setSubscribe);

  _Page(newConfig);
};
