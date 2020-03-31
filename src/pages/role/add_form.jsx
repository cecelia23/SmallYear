import React from "react";
import { Form, Input } from "antd";
import PropTypes from "prop-types";

class AddForm extends React.Component {
  static propTypes = {
    setForm: PropTypes.func.isRequired
  };

  render() {
    const { setForm } = this.props;
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
      <Form>
        <Form.Item label="角色名称" {...formLayout}>
          {getFieldDecorator("roleName", {
            initialValue: " ",
            rules: [
              {
                required: true,
                message: "角色名称不能为空"
              }
            ]
          })(<Input placeholder="请输入角色名称"></Input>)}
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(AddForm);
