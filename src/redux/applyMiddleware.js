const Redux = require('redux');
const applyMiddleware = Redux.applyMiddleware;

// 使用promise实现异步
const promiseAction = function(name) {
    return new Promise((resovle, reject) => {
        setTimeout(() => {
            resovle({
                type: 'changeName',
                name
            })
        }, 3000);
    })
}
function* generateAction()  {
    let name = yield new Promise((resovle, reject) => {
        setTimeout(() => {
            resovle('lead');
        }, 3000);
    })
    return {
        type: 'changeName',
        name
    }
}
// 使用generator实现异步：在生成器外部又包了一层，使之可以传递参数
function generatorAction(name) {
    return function* ()  {
        name = yield new Promise((resovle, reject) => {
            setTimeout(() => {
                resovle(name);
            }, 2000);
        })
        return {
            type: 'changeName',
            name
        }
    }
}
// 同步解析器
const logger = store => nextDispatch => action => {
    console.log('start', action.type);
    let result = nextDispatch(action);
    console.log('end', action.type);
    return result;
}
// 两种异步解析器
const promise = store => nextDispatch => action => {
    if (action instanceof Promise) {
        action.then((action) =>  nextDispatch(action))
    } else {
        nextDispatch(action)
    }
}
const generator = store => nextDispatch => action => {
    if (typeof action === 'function' && action.constructor.name === 'GeneratorFunction') {
        const g = action(); // call generator to get iterator
        const v = g.next();
        function run(v) {
            if (v.done) {
                nextDispatch(v.value);
            } else {
                if (v.value && v.value instanceof Promise) {
                    v.value.then((name) => {
                        // console.log(store);
                        run(g.next(name));
                    });
                } else {
                    nextDispatch(v.value);
                }
            }
        }
        run(v);
    } 
}
// 通用的异步解析器
const asyncMiddleware = store => nextDispatch => action => {
    if (typeof action === 'function' && action.constructor.name === 'GeneratorFunction') {
        const g = action(); // call generator to get iterator
        const v = g.next();
        function run(v) {
            if (v.done) {
                nextDispatch(v.value);
            } else {
                if (v.value && v.value instanceof Promise) {
                    v.value.then((name) => {
                        run(g.next(name));
                    });
                } else {
                    nextDispatch(v.value);
                }
            }
        }
        run(v);
    } else if (action instanceof Promise) {
        action.then((action) =>  nextDispatch(action))
    } else {
        nextDispatch(action)
    }
}
// 调用Redux原来的createStore       先是异步解析器，再是同步解析器
const createStore = applyMiddleware(asyncMiddleware, logger)(Redux.createStore);

const reducer = function(state, action){
    switch (action.type) {
        case 'changeName':
            return Object.assign({}, state, {name: action.name});
        default: 
            return state;
    }
}
const store = createStore(reducer, {name: ''});

store.subscribe(() => console.log(store.getState()));
// 同步调用
// store.dispatch({
//     type: 'changeName',
//     name: 'alex'
// })
// 异步调用1
// store.dispatch(promiseAction('in promise action'));
// 异步调用2
// store.dispatch(generateAction);
// 异步调用3
store.dispatch(generatorAction('alex'));
