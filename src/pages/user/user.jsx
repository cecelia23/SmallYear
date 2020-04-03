import React from "react";
import { Card, Button, Table, Modal, message } from "antd";
import LinkButton from "../../components/link-button";
import UserForm from "./user_form";
import { PAGE_SIZE } from "../../config/default";
import { formatDate } from "../../utils/dateUtils";
import { reqUsers, reqRoles, reqDeleteUser, reqAddUpdateUser } from "../../api";

class User extends React.PureComponent {
  state = {
    users: [],
    roles: [],
    isShow: false
  };
  initColumns = () => {
    this.columns = [
      {
        title: "用户名",
        dataIndex: "username"
      },
      {
        title: "邮箱",
        dataIndex: "email"
      },
      {
        title: "电话",
        dataIndex: "phone"
      },
      {
        title: "注册时间",
        dataIndex: "create_time",
        render: formatDate
      },
      {
        title: "所属角色",
        dataIndex: "role_id",
        render: role_id => this.roleName[role_id]
      },
      {
        title: "操作",
        render: user => (
          <span>
            <LinkButton onClick={() => this.updateUser(user)}>修改</LinkButton>
            <LinkButton onClick={() => this.deleteUser(user)}>删除</LinkButton>
          </span>
        )
      }
    ];
  };
  initRoleName = roles => {
    this.roleName = roles.reduce((pre, role) => {
      pre[role._id] = role.name;
      return pre;
    }, {});
  };
  getUsers = async () => {
    const result0 = await reqUsers();
    const result1 = await reqRoles();
    if (result0.status === 0 && result1.status === 0) {
      const { users } = result0;
      const roles = result1.list;
      this.initRoleName(roles);
      this.setState({
        users,
        roles
      });
    }
  };
  deleteUser = (user) => {
    Modal.confirm({
      title: `你确定要删除${user.username}吗？`,
      onOk: async () => {
       const result = await reqDeleteUser(user._id);
       if (result.status === 0) {
         message.success('删除用户成功！');
         this.getUsers();
       } else {
         message.error('删除用户失败');
       }
      }
    })
  }
  addOrUpdateUsers = async () => {
    // 收集数据
    const user = this.form.getFieldsValue();
    this.form.resetFields();
    this.setState({
      isShow: false
    })
    let isUpdate = false;
    if (this.user && this.user._id) {
      user._id = this.user._id;
      isUpdate = true;
    }
     // 发送请求
    const result = await reqAddUpdateUser(isUpdate, user);

    if (result.status === 0) {
      message.success(`${user._id ? "更新":"添加"} 用户成功`);
      this.getUsers();
    }
    // 清空user对象
    this.user = {};
  };
  updateUser = (user) => {
    this.user = user;
    // setstate会重新render
    this.setState({
      isShow: true,
    });
  }
  UNSAFE_componentWillMount() {
    this.initColumns();
  }
  componentDidMount () {
    this.getUsers();
  }
  render() {
    const { users, roles, isShow } = this.state;
    const user = this.user || {};
    const title = <Button type="primary" onClick={() => this.setState({isShow: true})}>创建用户</Button>;
    return (
      <Card title={title}>
        <Table
          bordered
          rowKey="_id"
          dataSource={users}
          columns={this.columns}
          pagination={{
            defaultPageSize: PAGE_SIZE
          }}
        ></Table>
        <Modal
          title={user._id? "更新用户" : "添加用户"}
          visible={isShow}
          onOk={this.addOrUpdateUsers}
          onCancel={() => {
            this.user = {};
            this.setState({ isShow: false });
            this.form.resetFields();
          }}
        >
          <UserForm 
          roles={roles}
          user={user}
          setForm={(form) => this.form = form} />
        </Modal>
      </Card>
    );
  }
}

export default User;
