import {add,subject} from '../../actions/index';

Component({
  properties: {
    confirm: {
      type: String,
      value: '确定'
    },
    cancel: {
      type: String,
      value: '取消'
    }
  },
  actions:[add,subject],
  states:['count'],
  data: {
    compatibleXPage: 44
  },
  methods: {
    handleCancel() {
      this.subject();
    },
    handleConfirm() {
      this.add();
    },
  },
  lifetimes:{

  }
});
