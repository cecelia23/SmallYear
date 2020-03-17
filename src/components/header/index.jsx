import React from "react";
import { withRouter } from "react-router-dom";
import { Modal } from "antd";
import logo from "../../assets/qing.png";
import { reqWeather } from "../../api";
import memoryStore from "../../utils/menoryUtil";
import storage from "../../utils/storageUtil";
import { formatDate } from "../../utils/dateUtils";
import menuList from "../../config/menuConfig";
import "./index.less";

class Header extends React.Component {
  // 异步的放到state中
  state = {
    time: Date.now(),
    weather: ""
  };
  getWeather = async () => {
    const weather = await reqWeather("烟台");
    this.setState({ weather });
  };
  getTime = () => {
    this.intervalId = setInterval(() => {
      const time = Date.now();
      this.setState({ time });
    }, 1000);
  };
  getTitle = () => {
    const pathname = this.props.location.pathname;
    let title;
    menuList.forEach(item => {
      if (item.key === pathname) {
        title = item.title;
      } else if (item.children) {
        const cItem = item.children.find(cItem => cItem.key === pathname);
        if (cItem) {
          title = cItem.title;
        }
      }
    });
    return title;
  };
  logout = () => {
    Modal.confirm({
      title: "你确定要退出吗?",
      onOk: () => {
        storage.removeUser();
        memoryStore.user = {};
        clearInterval(this.intervalId);
        console.log("OK");
        this.props.history.replace("/login");
      }
    });
  };
  componentDidMount() {
    this.getTime();
    this.getWeather();
  }
  render() {
    const { user } = memoryStore;
    const title = this.getTitle();
    const time = formatDate(this.state.time);
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎，{user.name}</span>
          <a href="javascript:void(0);" onClick={this.logout.bind(this)}>退出</a>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{time} </span>
            <img src={logo} alt="sunny" />
            <span>{this.state.weather}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
