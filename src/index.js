/**
 * @file wx-redux
 * @author shuai.li
 */

import { proxyPage, getType } from './utils';

let Store;

const _app=App;
App=(config)=>{
  if(!config.store){
    throw new Error('请在App中初始化一个store!!!')
  }
  Store=config.store;
  return _app(config)
};

// todo 现在是过程式的写法,考虑改成面向对象的写法
function processNewConfig(config, isProcessComponent=false){
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
      if(isProcessComponent){
        if(!newConfig.methods) newConfig.methods={};
        newConfig.methods[action.name]=function (...args){
          dispatch(action.apply(null,args))
        };
        return;
      }
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
  return subscribe(()=>{
    // todo 在这里可以做diff,然后确定到底需要更新那个页面的那个部分
    // 此处有性能优化的两个点: 1.json-diff 2.不正在显示的页面不更新state
    const { getState } = Store;
    const newState = getState();
    const updateObj={};
    // todo 此处可以做优化,让用户可以按照 a.b.c.d类似的方式来更新state
    config.states.forEach((s)=>{
      updateObj[s]=newState[s]
    });
    this.setData(updateObj)
  });
}

const _Page = Page;
Page = (config) => {
  const newConfig = processNewConfig(config);
  let unsubscribe=null;
  proxyPage(newConfig, 'onLoad', function(options){ unsubscribe=setSubscribe.call(this,options,newConfig)});
  if(getType(unsubscribe) === 'function'){
    console.log('绑定函数');
    proxyPage(newConfig, 'onUnload', unsubscribe());
  }
  _Page(newConfig);
};

const _Component = Component;
Component = (config) => {
  const newConfig = processNewConfig(config,true);
  let unsubscribe=null;
  // todo 在页面和组件的卸载阶段需要将listen给去掉,防止无用的页面刷新
  if(newConfig.lifetimes){
    proxyPage(newConfig.lifetimes, 'attached', function(options){unsubscribe=setSubscribe.call(this,options,newConfig)});
  }else {
    // todo 加入自动化测试,方便测试写的逻辑没有问题
    proxyPage(newConfig, 'attached', function(options){unsubscribe=setSubscribe.call(this,options,newConfig)});
  }
  if(getType(unsubscribe) === 'function'){
    console.log('绑定组件卸载函数');
    proxyPage(newConfig, 'detached', unsubscribe());
  }
  _Component(newConfig);
};

