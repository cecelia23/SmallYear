import React from 'react';
// import {actions} from '../redux/login';
// import ReduxUI from '../redux/react-redux-connect';
import { Form, Input, Button } from 'antd';
import '../index.css';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
class Login extends React.Component {

  onFinish(values) {
    console.log(values);
  };

  // onReset() {
  //   form.resetFields();
  // };

  // onFill() {
  //   form.setFieldsValue({
  //     note: 'Hello world!',
  //     gender: 'male',
  //   });
  // };

  render () {
    return <div>
      用户名： <input />
      密码： <input />
      <Button type="primary">nihao</Button>
      {/* <ReduxUI /> */}
      <Form {...layout}  name="control-hooks" onFinish={this.onFinish}>
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
          <Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button">
            Reset
          </Button>
        </Form.Item>
      </Form>
  </div>
  }
};

export default Login;
