import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Modal } from "antd";
import LinkButton from "../link-button";
import logo from "../../assets/qing.png";
import { reqWeather } from "../../api";
// import memoryStore from "../../utils/menoryUtil";
// import storage from "../../utils/storageUtil";
import { formatDate } from "../../utils/dateUtils";
import { logout } from "../../redux/action";
// import menuList from "../../config/menuConfig";
import "./index.less";

class Header extends React.Component {
  // 异步的放到state中
  state = {
    time: Date.now(),
    weather: "",
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
  // 从redux中取headTitle， 不再需要一个个比较
  // getTitle = () => {
  //   const pathname = this.props.location.pathname;
  //   let title;
  //   menuList.forEach(item => {
  //     if (item.key === pathname) {
  //       title = item.title;
  //     } else if (item.children) {
  //       const cItem = item.children.find(
  //         cItem => pathname.indexOf(cItem.key) === 0
  //       );
  //       if (cItem) {
  //         title = cItem.title;
  //       }
  //     }
  //   });
  //   return title;
  // };
  logout = () => {
    Modal.confirm({
      title: "你确定要退出吗?",
      onOk: () => {
        clearInterval(this.intervalId);
        this.props.logout();
        // storage.removeUser();
        // memoryStore.user = {};
        // this.props.history.replace("/login");
      },
    });
  };
  componentDidMount() {
    this.getTime();
    this.getWeather();
  }
  render() {
    // const { user } = memoryStore;
    // const title = this.getTitle();
    const user = this.props.user;
    const { title } = this.props.headTitle;
    const time = formatDate(this.state.time);
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎，{user.username}</span>
          <LinkButton onClick={this.logout.bind(this)}>退出</LinkButton>
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
const mapStateToProps = (state, ownProps) => {
  return {
    headTitle: state.headTitle,
    user: state.user,
  };
};

export default connect(mapStateToProps, { logout })(withRouter(Header));
