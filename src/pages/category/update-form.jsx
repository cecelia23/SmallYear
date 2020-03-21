import React from "react";
import { Form, Input } from "antd";
import PropTypes from "prop-types";

class UpdateForm extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    setForm: PropTypes.func.isRequired
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    // 向父组件传递参数form
    this.props.setForm(this.props.form);
    const name = this.props.categoryName;
    return (
      <Form>
        分类名称：
        <Form.Item>
          {getFieldDecorator("categoryName", {
            initialValue: name,
            rules: [
              {
                required: true,
                message: '分类名称不能少'
              }
            ]
          })(<Input placeholder="请输入分类名称" />)}
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(UpdateForm);
