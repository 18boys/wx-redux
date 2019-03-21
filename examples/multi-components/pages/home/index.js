import {updateTitle} from '../../actions/index';
Page({
  data:{
    a:'aaa',
  },
  actions:[updateTitle],
  states:['title'],
  onLoad(){
    console.log('app todos', this)
  },
  bindKeyInput(e){
    const text =e.detail.value;
    this.updateTitle(text);
  }
});
