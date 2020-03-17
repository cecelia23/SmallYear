import React from "react";
import "./index.less";
/*
自定义一个类似<a></a>的组件
*/
export default function LinkButton(props) {
  return <button {...props} className="link-button"></button>;
}
