const Redux = require('redux');

const reducer = function(state, action) {
    if (action.type === 'changeName') {
        console.log(123)
        // const newState = JSON.parse(JSON.stringify(state));
        return Object.assign({}, state, {name: action.name});
    } else {
        // 未配置情况，返回原来的state
        return state;
    }
}
// args: reducer(return state), [init state]
const store = Redux.createStore(reducer, {name: 'init name', age: 20});

store.subscribe(() => console.log(store.getState()));

// 异步触发
function callAction() {
    const actionPromise = new Promise((resovle, reject) => {
        const action = {
            type: 'changeName',
            name: 'lily'
        };
        resovle(action);
    })

    actionPromise.then((action) => {
        store.dispatch(action);
    })
}
callAction();

// 同步dispatch
// const action = {
//     type: 'changeName',
//     name: 'lily'
// }
// store.dispatch(action);

console.log('sync test');