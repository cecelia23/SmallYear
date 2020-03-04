const Redux = require('redux'); 

const reducer = function(state, action) {
  if (typeof state === 'undefined') return {name:'input context', num: 0, url: 'login', users: [{name: 'alex'},{name: 'jack'}]};
  switch (action.type) {
    case 'changeName':
      return Object.assign({}, state, {name: action.payload.name});
    case 'access': 
      return Object.assign({}, state, {num: ++state.num});
    case 'link':
      return Object.assign({}, state, {url: action.payload.url});
    default:
      return state;
  }
}
const store = Redux.createStore(reducer);

let actions = {
  changeName (name) {
    return {
      type: 'changeName',
      payload: {
        name
      }
    }
  },
  access () {
    return {
      type: 'access'
    }
  },
  link (url) {
    return {
      type: 'link',
      payload: {
        url
      }
    }
  }
}

// store.subscribe(() => console.log(store.getState()));

export {store, actions};