import { SET_HEAD_TITLE } from "./action-type";

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
