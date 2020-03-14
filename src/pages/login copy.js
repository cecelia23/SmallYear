import React from "react";
import { actions } from "../redux/index";
import { connect } from "react-redux";
// import {useHistory} from 'react-router-dom';
// import ReduxUI from '../redux/react-redux-connect';
import { Form, Input, Button } from "antd";
import "../index.css";

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 8
  }
};
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 16
  }
};
class Login extends React.Component {
  // const [form] = Form.useForm();
  // const history = useHistory();

  onFinish(e) {
    this.props.login(e);
    setTimeout(() => {
      console.log(this.props.isLogin);
      if (this.props.isLogin) {
      } else {
        alert("登录失败");
      }
    }, 1000);
  }

  onReset() {
    this.props.form.resetFields();
    console.log(this.props.form);
  }

  validatePsw = (rule, value, callback) => {
    if (!value) {
      callback("请输入密码");
    } else if (value.length < 4 ) {
      callback("密码长度需要大于4位");
    } else if (value.length > 12) {
      callback("密码长度需要小于12位");
    } else if (!/^[A-Za-z0-9_]$/.test(value)) {
      callback('密码必须有字母、数字、下划线组成');
    } else {
      callback();
    }
  };

  // onFill() {
  //   form.setFieldsValue({
  //     note: 'Hello world!',
  //     gender: 'male',
  //   });
  // };
  render() {
    // const {form} = this.props;
    return (
      <div>
        {/* 用户名： <input />
      密码： <input />
      <Button type="primary">nihao</Button> */}
        {/* <ReduxUI /> */}
        <Form
          {...layout}
          name="control-hooks"
          onFinish={this.onFinish.bind(this)}
        >
          <Form.Item
            name="username"
            label="用户名"
            rules={[
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
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[
              {
                required: true,
                message: "请输入密码"
              },
              {
                validator: this.validatePsw
              }
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={this.onReset.bind(this)}>
              Reset
            </Button>
          </Form.Item>
        </Form>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isLogin: state.isLogin
  };
};

const WrappedLogin = Form.create({name: 'login'})(Login);
export default connect(mapStateToProps, actions)(WrappedLogin);
