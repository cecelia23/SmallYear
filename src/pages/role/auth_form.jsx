import React from "react";
import { Form, Input, Tree } from "antd";
import PropTypes from "prop-types";
import menuList from "../../config/menuConfig";

const { TreeNode } = Tree;

class AuthForm extends React.Component {
  static propTypes = {
    role: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    const { menu } = this.props.role;
    if (menu) {
      const menuList = menu.split(",");
      this.state = {checkedKeys: menuList};
    } else{
      this.state ={ checkedKeys: []}
    }

  }
  getTreeNode = menu => {
    return menu.reduce((pre, item) => {
      pre.push(
        <TreeNode title={item.title} key={item.key}>
          {item.children ? this.getTreeNode(item.children) : null}
        </TreeNode>
      );
      return pre;
    }, []);
  };
  getMenus = () => {
      return this.state.checkedKeys;
  }
  onCheck = checkedKeys => {
    console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys });
  };


  UNSAFE_componentWillMount() {
    this.treeNode = this.getTreeNode(menuList);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    var {menu} = nextProps.role;
    if (typeof menu === 'string') {
      menu = menu.split(',');
    }
    this.setState({
      checkedKeys: menu
    })
  }

  render() {
    const { role } = this.props;
    let { checkedKeys } = this.state;

    const formLayout = {
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 16
      }
    };

    return (
      <Form>
        <Form.Item label="角色名称" {...formLayout}>
          <Input value={role.name} disabled></Input>
        </Form.Item>
        <Tree
          checkable
          defaultExpandAll
          onCheck={this.onCheck}
          checkedKeys={checkedKeys}
        >
          <TreeNode title="平台权限" key="all">
            {this.treeNode}
          </TreeNode>
        </Tree>
      </Form>
    );
  }
}

export default AuthForm;
