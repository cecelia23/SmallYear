const Redux = require('redux');

const reducer = function(state, action) {
    switch (action.type) {
        case 'changeName':
            return Object.assign({}, state, {name: action.name});
        default:
            return state;
    }
}

const store = Redux.createStore(reducer, {name: 'li'});
store.subscribe(() => console.log(store.getState()));

function a (name) {
    return {
        type: 'changeName',
        name
    }
}
function b (name) {
    return {
        type: 'changeName',
        name
    }
}
// 将store.dispatch作为参数传入，得到的结果为函数
// 调用actions，实现store的触发
const actions = Redux.bindActionCreators({a, b}, store.dispatch);

actions.a('lee');
actions.b('lead')