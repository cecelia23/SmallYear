const Redux = require('redux');

// const state = { a: [], b: [], c:{ name: '', group: []} };

const aReducer = function(state, action) {
    if (typeof state === 'undefined') return [];
    switch (action.type) {
        case 'a':
            return state.concat([action.data]);
        default:
            return state;
    }
}

const bReducer = function(state, action) {
    if (typeof state === 'undefined') return [];
    switch (action.type) {
        case 'b':
            return state.concat([action.data]);
        default:
            return state;
    }
}

const cNameReducer = function(state, action) {
    if (typeof state == 'undefined') return '';
    switch (action.type) {
        case 'c':
            return action.name;
        default:
            return state;       
    }
}

const cGroupReducer = function(state, action) {
    // state对应的是group的value
    if (typeof state === 'undefined') return [];
    switch(action.type) {
        case 'c':
            return state.concat(action.item);
        default:
            return state;
    }
}

const cReducer = function (state, action) {
    // state对应的是c的value
    if (typeof state === 'undefined') return {name: '', group: []};
    switch(action.type) {
        case 'c':
            // 返回reducer处理函数，然后调用
            return Redux.combineReducers({name: cNameReducer, group: cGroupReducer})(state, action); 
        default:
            return state;
    }
}
// 
const reducers = Redux.combineReducers({a: aReducer, b: bReducer, c: cReducer});
const store = Redux.createStore(reducers, {a: [111], b: [222], c:{ name: 'hi', group:[] }});

store.subscribe(() => console.log(store.getState()));

const actionA = {
    type: 'b',
    data: 'lead'
};
const actionB = {
    type: 'a',
    data: 'tail'
}
const actionC = {
    type: 'c',
    name: 'jkp',
    item: 'pp'
}
store.dispatch(actionA);
store.dispatch(actionB);
store.dispatch(actionC);


// combainReducer 实现原理

// function combineReducer(reducers) {
//     return function reducer(state, action) {
//         let newState = {};
//         for (let key in reducers) {
//             newState[key] = reducers[key](state[key],action);
//         }
//     }
// }