/*根据指定的reducer函数生成并返回一个store对象 */
export const createStore = (reducer) => {
  // 通过局部变量，实现内部存储的state对象，初始值由reducer的初始执行决定
  let state = reducer(undefined, { type: "@@redux/init" });

  let listeners = [];
  // 返回store内部的state数据
  function getState() {
    return state;
  }

  /*分发action,触发reducer,
   */
  function dispatch(action) {
    //  1.触发reducer调用，生成新的state
    let newState = reducer(state, action);
    //   2. 保存新生成的state
    state = newState;
    //   3. 调用已有的监听回调函数
    listeners.forEach((listener) => listener());
  }
  /* 绑定state改变的监听回调函数
  一个store可以绑定多个监听回调 */
  function subscribe(listener) {
    // 缓存到listeners容器中
    listeners.push(listener);
  }
  return {
    getState,
    dispatch,
    subscribe,
  };
};
/*  得到的整合后的reducer结构
{
    user: user(state.user, action),
    count: count(state.count, action)
}
*/
export const combineReducers = (reducers) => {
  return (state = {}, action) => {
    // 对象中所有属性名的数组
    const newState = Object.keys(reducers).reduce((pre, item) => {
      pre[item] = reducers[item](state[item], action);
      return pre;
    }, {});
    state = newState;
  };
};
