import React from "react";
import { Form, Input, Select } from "antd";
import PropTypes from "prop-types";

const Option = Select.Option;

class UserForm extends React.Component {
  static propTypes = {
    setForm: PropTypes.func.isRequired,
    roles: PropTypes.array.isRequired,
    user: PropTypes.object
  };

  render() {
    const { setForm, roles, user } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formLayout = {
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 16
      }
    };
    setForm(this.props.form);
    return (
      <Form {...formLayout}>
        <Form.Item label="用户名">
          {getFieldDecorator("username", {
            initialValue: user.username,
            rules: [
              {
                required: true,
                message: "用户名不能为空"
              }
            ]
          })(<Input placeholder="请输入用户名"></Input>)}
        </Form.Item>
        {user._id ? null : (
          <Form.Item label="密码">
            {getFieldDecorator("password", {
              initialValue: "",
              rules: [
                {
                  required: true,
                  message: "密码不能为空"
                }
              ]
            })(<Input type="password" placeholder="请输入密码"></Input>)}
          </Form.Item>
        )}
        <Form.Item label="手机号">
          {getFieldDecorator("phone", {
            initialValue: user.phone
          })(<Input placeholder="请输入手机号"></Input>)}
        </Form.Item>
        <Form.Item label="邮箱">
          {getFieldDecorator("email", {
            initialValue: user.email
          })(<Input placeholder="请输入邮箱"></Input>)}
        </Form.Item>
        <Form.Item label="角色">
          {getFieldDecorator("role_id", {
            initialValue: user.role_id
          })(
            <Select placeholder="请选择角色">
              {roles.map(role => (
                <Option key={role._id} value={role._id}>
                  {role.name}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(UserForm);
