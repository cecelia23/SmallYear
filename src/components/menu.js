import React from 'react';
import { Menu } from "antd";
import { Link } from 'react-router-dom';
// import {
//   AppstoreOutlined,
//   MailOutlined,
//   SettingOutlined
// } from "@ant-design/icons";
const { SubMenu } = Menu;
class Sider extends React.Component {
  handleClick = e => {
    console.log("click ", e);
  };
  render() {
    return (
      <Menu
        onClick={this.handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
      >
        <Menu.Item key="1"><Link to="/login"> Login</Link></Menu.Item>{" "}
        <SubMenu
          key="sub2"
          title={
            <span>
              {" "}
              {/* <AppstoreOutlined /> */}
               <span>短视频推广</span>{" "}
            </span>
          }
        >
          {" "}
          <Menu.Item key="5"><Link to="/clock">订单信息查询</Link></Menu.Item>{" "}
          <Menu.Item key="6"><Link to="/blog/312">日志查询</Link></Menu.Item>{" "}
        </SubMenu>{" "}
        <SubMenu
          key="sub3"
          title={
            <span>
              {" "}
              {/* <SettingOutlined />  */}
              <span>直播推广</span>{" "}
            </span>
          }
        >
          {" "}
          <Menu.Item key="9"><Link to="/board">直播订单查询</Link></Menu.Item>{" "}
        </SubMenu>{" "}
        <SubMenu
          key="sub4"
          title={
            <span>
              {" "}
              {/* <SettingOutlined />  */}
              <span>代金券管理</span>{" "}
            </span>
          }
        >
          {" "}
          <Menu.Item key="9"><Link to="/coupon">代金券列表</Link></Menu.Item>{" "}
        </SubMenu>{" "}
        <SubMenu
          key="sub5"
          title={
            <span>
              {" "}
              {/* <SettingOutlined /> */}
               <span>任务管理</span>{" "}
            </span>
          }
        >
          {" "}
          <Menu.Item key="9"><Link to="/user">用户集列表</Link></Menu.Item>{" "}
        </SubMenu>{" "}
      </Menu>
    );
  }
}
export default Sider