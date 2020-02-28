const Reflux = require('reflux');

const action = Reflux.createAction();
const store = Reflux.createStore({
    init() {
        this.data = { num:0 };
        // store监听action, 匿名函数要加bind
        // this.listenTo(action, function(){
        //     this.data.num++;
        //     this.trigger(this.data);
        // }.bind(this))
        this.listenTo(action, () => {
            this.data.num++;
            this.trigger(this.data);
        })
        // test: this point to store
        // action.listen(data => console.log(this));
    }
})
// 监听store触发
store.listen(data => console.log(data));

action.trigger('start in action');
action();
action();
action();
action();
action();
