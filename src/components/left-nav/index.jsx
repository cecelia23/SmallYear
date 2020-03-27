import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu, Icon } from "antd";
import menu from "../../config/menuConfig";
import logo from "../../assets/logo192.png";
import "./index.less";

const { SubMenu } = Menu;

class LeftNav extends React.Component {
  state = {
    mode: "inline",
    theme: "light"
  };
  // array.map() + 递归
  getMenuNode = menu => {
    return menu.map(item => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              {item.title}
            </Link>
          </Menu.Item>
        );
      } else {
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNode(item.children)}
          </SubMenu>
        );
      }
    });
  };
  // array.reduce() + 递归
  getMenuNodes = (menu) => {
    return menu.reduce((pre, item) => {
      if(! item.children) {
        pre.push((
          <Menu.Item key={item.key}>
          <Link to={item.key}>
            <Icon type={item.icon} />
            {item.title}
          </Link>
        </Menu.Item>
        ))
      } else {
        const cItem = item.children.find((cIterm) =>  this.props.location.pathname.indexOf(cIterm.key) === 0);
        if (cItem) {
          this.openKey = item.key;
        }
        pre.push((
          <SubMenu
          key={item.key}
          title={
            <span>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </span>
          }
        >
          {this.getMenuNode(item.children)}
        </SubMenu>
        ))
      }
      return pre
    }, [])
  }
  componentWillMount() {
    this.menuNodes = this.getMenuNodes(menu);
  }

  render() {
    let param = this.props.location.pathname;
    // debugger
    if (param.indexOf('/product') === 0) {
      param = '/product';
    }
    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-link">
          <img src={logo} alt="logo" />
          <h2>后台管理系统</h2>
        </Link>
        <Menu
          selectedKeys={[param]}
          defaultOpenKeys={[this.openKey]}
          mode="inline"
          theme="light"
        >
          {/* {this.getMenuNode(menu)} */}
          { this.menuNodes }
        </Menu>
      </div>
    );
  }
}

export default withRouter(LeftNav);
