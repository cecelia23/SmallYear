import React from "react";
import { Form, Select, Input } from "antd";
import PropTypes from "prop-types";
const { Option } = Select;

class AddForm extends React.Component {
  static propTypes = {
    categorys: PropTypes.array.isRequired,
    parentId: PropTypes.number.isRequired,
    setForm: PropTypes.func.isRequired
  };

  render() {
    const { categorys, parentId, setForm } = this.props;
    const { getFieldDecorator } = this.props.form;
    setForm(this.props.form);
    return (
      <Form>
        所属分类：
        <Form.Item>
          {getFieldDecorator("parentId", {
            initialValue: parentId
          })(
            <Select>
              <Option value={0}>一级分类</Option>
              {categorys.map(cItem => (
                <Option key={cItem._id} value={cItem._id}>{cItem.name}</Option>
              ))}
            </Select>
          )}
        </Form.Item>
        分类名称:
        <Form.Item>
          {getFieldDecorator("categoryName", {
            initialValue: " ",
            rules: [
                {
                    required: true,
                    message: '分类名称不能为空'
                }
            ]
          })(<Input placeholder="请输入分类名称"></Input>)}
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(AddForm);
