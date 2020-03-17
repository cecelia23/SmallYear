import React from 'react';
import {actions} from '../../redux/index';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
// import ReduxUI from '../redux/react-redux-connect';
import { Form, Input, Button } from 'antd';
import '../index.css';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 16,
  },
};
function Login (props) {
  const [form] = Form.useForm();
  const history = useHistory();

  const onFinish = function(e) {
    props.login(e);
    setTimeout(() => {
      console.log(props.isLogin);
      if (props.isLogin) {
        history.push('/clock');
      } else {
        alert('登录失败')
      }
    }, 1000);
  };

  const onReset = function() {
    form.resetFields();
  };

  // onFill() {
  //   form.setFieldsValue({
  //     note: 'Hello world!',
  //     gender: 'male',
  //   });
  // };

    return (<div>
      {/* 用户名： <input />
      密码： <input />
      <Button type="primary">nihao</Button> */}
      {/* <ReduxUI /> */}
      <Form {...layout}  form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item
          name="username"
          label="用户名"
          rules={[
            {
              required: true,
            },
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
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" >
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
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
  </div>)
};

const mapStateToProps = (state, ownProps) => {
  return {
    isLogin: state.isLogin,
    name: state.name
  }
}
export default connect(mapStateToProps, actions)(Login);
