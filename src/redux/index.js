const Redux = require("redux");

const reducer = function(state, action) {
  if (typeof state === "undefined")
    return {
      name: "input context",
      num: 0,
      url: "login"
    };
  switch (action.type) {
    case "changeName":
      return Object.assign({}, state, { name: action.payload.name });
    case "access":
      return Object.assign({}, state, { num: ++state.num });
    case "link":
      return Object.assign({}, state, { url: action.payload.url });
    case "login":
      let username = action.payload.username;
      let password = action.payload.password;
      let isLogin;
      if (username === "123" && password === "123") {
        isLogin = true;
      } else {
        isLogin = false;
      }
      return Object.assign({}, state, { isLogin });
    default:
      return state;
  }
};
const store = Redux.createStore(reducer, {isLogin: false, users: [{ name: "alex" }, { name: "jack" }]});

let actions = {
  changeName(name) {
    return {
      type: "changeName",
      payload: {
        name
      }
    };
  },
  access() {
    return {
      type: "access"
    };
  },
  link(url) {
    return {
      type: "link",
      payload: {
        url
      }
    };
  },
  login(info) {
    return {
      type: "login",
      payload: info
    };
  }
};

// store.subscribe(() => console.log(store.getState()));

export { store, actions };
