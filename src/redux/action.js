import { SET_HEAD_TITLE, RECEIVE_USER, SHOW_ERROR_MSG, RESET_USER } from "./action-type";
import { reqLogin } from "../api";
import { message } from "antd";
import storageUtil from "../utils/storageUtil";
// 定义的函数是actionCreator, 通过调用actionCreator生成对应的action对象
export const receiveUser = user => {
  return {
    type: RECEIVE_USER,
    user
  };
};

export const showErrorMsg = errorMsg => {
  return {
    type: SHOW_ERROR_MSG,
    data: errorMsg
  };
};

export const logout = () => {
  // 清除localStorage中的数据
  storageUtil.removeUser();
  // 返回action对象
  return {type: RESET_USER};
}

export const changeName = name => {
  return {
    type: "changeName",
    payload: {
      name
    }
  };
};
export const link = url => {
  return {
    type: "link",
    payload: {
      url
    }
  };
};
export const increment = number => {
  return {
    type: "increment",
    data: number
  };
};
export const decrement = number => {
  return {
    type: "decrement",
    data: number
  };
};
export const asyncIncrement = number => {
  return dispatch => {
    setTimeout(() => {
      console.log(number);
      dispatch({
        type: "increment",
        data: number
      });
    }, 1000);
  };
};

export const setHeadTitle = title => {
  return {
    type: SET_HEAD_TITLE,
    data: title
  };
};

// 异步action
export const login = (username, password) => {
  return async dispatch => {
    // 发送ajax异步请求
    const result = await reqLogin(username, password);
    if (result.status === 0) {
      message.success("登录成功");
      // 保存到localStorage
      storageUtil.setUser(result.user);
      // 请求成功，调用对应的同步action
      dispatch(receiveUser(result.user));
    } else {
      // 请求失败，调用对应的同步action
      dispatch(showErrorMsg(result.msg));
    }
  };
};
