/*
    根据旧的state和action对象，返回新的state
*/
import storageUtil from "../utils/storageUtil";
import { combineReducers } from "redux";
import {
  SET_HEAD_TITLE,
  SHOW_ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
} from "./action-type";

// clock里面或用或不用的函数
const reducer = function (state, action) {
  if (typeof state === "undefined")
    return {
      name: "input context",
      url: "login",
      count: 0,
    };
  switch (action.type) {
    case "changeName":
      return Object.assign({}, state, { name: action.payload.name });
    case "link":
      return Object.assign({}, state, { url: action.payload.url });
    case "increment":
      return Object.assign({}, state, { count: state.count + action.data });
    case "decrement":
      return Object.assign({}, state, { count: state.count - action.data });
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
// 用来管理header中标题的reducer
const headTitle = (state, action) => {
  // 初始化state
  if (typeof state === "undefined") {
    return {
      title: "首页",
    };
  }
  switch (action.type) {
    case SET_HEAD_TITLE:
      return { title: action.data };
    default:
      return state;
  }
};

// 用来管理登录用户的reducer
const initUser = storageUtil.getUser();
const user = (state, action) => {
  if (typeof state === "undefined") {
    return initUser;
  }
  switch (action.type) {
    case RECEIVE_USER:
      return action.user;
    case SHOW_ERROR_MSG:
      return { ...state, msg: action.data };
    case RESET_USER:
      return {};
    default:
      return state;
  }
};

export default combineReducers({
  reducer,
  headTitle,
  user,
});
