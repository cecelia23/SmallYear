const Redux = require('redux');
const thunk = require('redux-thunk').default; // 用来实现redux异步的中间件

const asyncAction = function(name) {
    let action = {
        type: 'changeName',
        name
    }
    return dispatch => {
        setTimeout(() => {
            dispatch(action)
        }, 1000);
    }
}

const reducer = function(state, action) {
    if (typeof state === 'undefined') return {};
    switch (action.type) {
        case "changeName":
            return { name: action.name };
        default:
            return state;
    }
}
// out of style
// const createStore = Redux.applyMiddleware(ReduxThunk)(Redux.createStore);
// 使用redux-thunk作为解析器
const store = Redux.createStore(reducer, Redux.applyMiddleware(thunk));

store.subscribe(() => console.log(store.getState()));

store.dispatch(asyncAction('heinitllo'));
