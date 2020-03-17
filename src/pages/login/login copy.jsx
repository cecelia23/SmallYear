import React from "react";
import { actions } from "../../redux/index";
import { connect } from "react-redux";
import { withRouter, Redirect } from 'react-router-dom';

// import {useHistory} from 'react-router-dom';
// import ReduxUI from '../redux/react-redux-connect';
import { Form, Input, Icon, Button, message } from "antd";
import "./login.less";
import logo from "../../assets/logo192.png";
import { reqLogin } from "../../api/";
import memoryUtil from '../../utils/menoryUtil';
import storage from '../../utils/storageUtil';

const layout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 16
  }
};
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 18
  }
};

class Login extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    const form = this.props.form;
    // 在包含await最近的函数写async
    form.validateFields(async (err, value) => {
      if (!err) {
        // 发送异步请求
        const { username, password } = value;
        const res = await reqLogin(username, password);
        // 根据后台返回的状态
        if (res.status === 0) {
          message.success('登录成功');
          // 分别保存到内存、localstorage中
          memoryUtil.user = res.data.user;
          storage.setUser(res.data.user);
          // 页面跳转
          // console.log(this.props);
          // 在回调函数中跳转用history对象
          this.props.history.replace('/');
        } else {
          message.error(res.data.msg);
        }
        // reqLogin(username, password).then(res =>{
        //   console.log('success', res);
        // }).catch(err => {
        //   console.log('失败了', err)
        // })
      } else {
        message.error('用户名或密码格式不正确');
      }
    });
  }
  onReset() {
    this.props.form.resetFields();
    console.log(this.props.form);
  }

  validatePsw = (rule, value, callback) => {
    if (!value) {
      callback("请输入密码");
    } else if (value.length < 4) {
      callback("密码长度需要大于4位");
    } else if (value.length > 12) {
      callback("密码长度需要小于12位");
    } else if (!/^[A-Za-z0-9_]+$/.test(value)) {
      callback("密码必须有字母、数字、下划线组成");
    } else {
      callback();
    }
  };

  render() {
    const user = memoryUtil.user;
    if (user && user.id) {
      return <Redirect to='/' />
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo" />
          <h2>say something to 2020!</h2>
        </header>
        <section className="login-container">
          <div className="form-container">
            <h2>用户登录</h2>
            <Form
              {...layout}
              name="control-hooks"
              onSubmit={this.handleSubmit.bind(this)}
            >
              <Form.Item label="用户名">
                {getFieldDecorator("username", {
                  rules: [
                    {
                      required: true,
                      message: "用户名必须输入"
                    },
                    {
                      min: 4,
                      message: "用户名最少4位"
                    },
                    {
                      max: 12,
                      message: "用户名最多12位"
                    },
                    {
                      pattern: /^[a-zA-Z0-9_]+$/,
                      message: "用户名必须为字母、数字、下划线"
                    }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                  />
                )}
              </Form.Item>
              <Form.Item label="密码">
                {getFieldDecorator("password", {
                  rules: [
                    {
                      required: true,
                      message: "请输入密码"
                    },
                    {
                      validator: this.validatePsw
                    }
                  ]
                })(
                  <Input.Password
                    prefix={
                      <Icon
                        type="lock"
                        theme="twoTone"
                        style={{ color: "rgba(0,0,0,.25)" }}
                      />
                    }
                  />
                )}
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button htmlType="button" onClick={this.onReset.bind(this)}>
                  Reset
                </Button>
              </Form.Item>
            </Form>{" "}
          </div>
          {/* <ReduxUI /> */}
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isLogin: state.isLogin
  };
};

const WrappedLogin = Form.create({ name: "login" })(withRouter(Login));
export default connect(mapStateToProps, actions)(WrappedLogin);
