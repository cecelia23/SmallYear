const Redux = require('redux');
const ReduxPromise = require('redux-promise').default;

/* FSA
    action: {
        type: ,
        payload:{
        }
    }
    action: {
        type: ,
        payload: new Error(),
        error: true
    }    
    */
function asyncAction(name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                type: 'changeName',
                payload: { name }
            })
        }, 1000);
    })
}

const reducer = function(state, action) {
    if (typeof state === 'undefined') return {};
    switch (action.type) {
        case 'changeName':
            return Object.assign({}, state, {name: action.payload.name});
        default: 
            return state;
    }
}

const store = Redux.createStore(reducer, Redux.applyMiddleware(ReduxPromise));

store.subscribe(() => console.log(store.getState()));

store.dispatch(asyncAction('promise you'));


