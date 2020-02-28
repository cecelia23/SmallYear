const Reflux = require('reflux');

// const actions = Reflux.createActions(['action1', 'action2']);
const actions = Reflux.createActions({
    action1: {
        asyncResult: true
    }, 
    action2: {
        asyncResult: true
    }
});

const store = Reflux.createStore({
    listenables: actions,
    // init() {
    //     this.listenToMany(actions)
    // },
    action1 () {
        console.log('func in action1');
    },
    onAction1Completed () {
        console.log('action1 completed');
        this.trigger('in store');
    },
    onAction2() {
        console.log('func in action2')
    }
})

store.listen(data => console.log(data));

actions.action1();
actions.action2();
actions.action1.completed();