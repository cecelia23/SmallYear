import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setHeadTitle } from "../../redux/action";
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
  // 当前用户的role.menu中含有该item.key
  hasAuth = item => {
    const { key, isPublic } = item;
    const user = this.props.user;
    // 1. 用户名为admin
    // 2. 该导航页面为共有组件isPublic
    // 3. item.key 包含在 role.menu中
    if (
      user.username === "admin" ||
      isPublic ||
      user.role.menu.indexOf(key) !== -1
    ) {
      return true;
      // 4. item.children.key 包含在 role.menu中
    } else if (item.children) {
      return !!item.children.find(
        cItem => user.role.menu.indexOf(cItem.key) !== -1
      );
    } else {
      // 以上条件都不满足
      return false;
    }
  };
  // array.map() + 递归
  getMenuNode = menu => {
    let path = this.props.location.pathname;

    return menu.map(item => {
      if (this.hasAuth(item)) {
        if (!item.children) {
          // 点击的是menu.item,所以比较的是item.key
          if (item.key === path || path.indexOf(item.key) === 0) {
            this.props.setHeadTitle(item.title);
          }
          return (
            <Menu.Item key={item.key} onClick={() => {this.props.setHeadTitle(item.title)}}>
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
      }
    });
  };
  // array.reduce() + 递归
  getMenuNodes = menu => {
    return menu.reduce((pre, item) => {
      if (!item.children) {
        pre.push(
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              {item.title}
            </Link>
          </Menu.Item>
        );
      } else {
        const cItem = item.children.find(
          cIterm => this.props.location.pathname.indexOf(cIterm.key) === 0
        );
        if (cItem) {
          this.openKey = item.key;
        }
        pre.push(
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
      return pre;
    }, []);
  };
  UNSAFE_componentWillMount() {
    this.menuNodes = this.getMenuNode(menu);
  }

  render() {
    let param = this.props.location.pathname;
    // debugger
    if (param.indexOf("/product") === 0) {
      param = "/product";
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
          {this.menuNodes}
        </Menu>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  };
};
export default connect(mapStateToProps, { setHeadTitle })(withRouter(LeftNav));
