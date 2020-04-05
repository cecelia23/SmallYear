import {composeWithDevTools} from 'redux-devtools-extension';
import {createStore, applyMiddleware} from 'redux';
// import {createStore} from "../libs/redux";
import thunk from "redux-thunk";
import reducer from './reducer';

// 要实现异步action, 需引入中间件redux-thunk
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
// const store = createStore(reducer);

// store.subscribe(() => console.log(store.getState()));

export default store;
