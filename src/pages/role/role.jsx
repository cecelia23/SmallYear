import React from "react";
import { withRouter } from "react-router-dom";
import { Card, Button, Table, message, Modal } from "antd";
import AddForm from "./add_form";
import AuthForm from "./auth_form";
import Test from "../../components/test";
import { PAGE_SIZE } from "../../config/default";
import memoryUtil from "../../utils/menoryUtil";
import storage from "../../utils/storageUtil";
import { formatDate, toSQLDate } from "../../utils/dateUtils";
import { reqRoles, reqRoleAdd, reqRoleUpdate } from "../../api";

class Role extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roles: [],
      role: {}, // 用于保存选中的对象
      isShowAdd: false,
      isShowAuth: false
    };
    this.authRef = React.createRef();
  }
  initColumn() {
    this.columns = [
      {
        title: "角色名称",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "创建时间",
        dataIndex: "create_time",
        render: formatDate
      },
      {
        title: "授权时间",
        dataIndex: "auth_time",
        render: formatDate
      },
      {
        title: "授权人",
        dataIndex: "auth_name"
      }
    ];
  }
  // 异步获取角色
  getRoles = async () => {
    const result = await reqRoles();
    if (result.status === 0) {
      const roles = result.list;
      this.setState({
        roles
      });
    } else {
      message.error("无法获取角色列表");
    }
  };
  // 点击某行
  onRowHandle = (row, rowIndex) => {
    return {
      onClick: event => {
        this.setState({
          role: row
        });
      }
    };
  };
  // 添加角色
  addRole = () => {
    // 表单验证
    this.form.validateFields(async (error, values) => {
      if (!error) {
        // 收集数据
        const roleName = values.roleName;
        // 清空form中的内容
        this.form.resetFields();
        this.setState({
          isShowAdd: false
        });
        // 请求
        const result = await reqRoleAdd(roleName);
        if (result.status === 0) {
          message.success("添加角色成功");
          this.getRoles();
        } else {
          message.error("添加角色失败");
        }
      }
    });
  };
  // 更改角色权限
  addRoleAuth = async () => {
    // 隐藏蒙层
    this.setState({
      isShowAuth: false
    });
    // 收集数据
    const menus = this.authRef.current.getMenus();
    const { role } = this.state;
    role.menu = menus;
    role.auth_name = memoryUtil.user.username;
    let time = Date.now();
    let auth_time = Number(toSQLDate(time));
    role.auth_time = auth_time;
    // 请求
    const result = await reqRoleUpdate(role);
    if (result.status === 0) {
      // 当前用户所属的角色权限被修改,需退出重新登录
      if (role._id === memoryUtil.user.role_id) {
        memoryUtil.user = {};
        storage.removeUser();
        console.log(this);
        debugger;
        this.props.history.replace("/login");
        message.info("当前用户角色权限修改，需重新登录");
      } else {
        message.success("更新角色权限成功");
        this.getRoles();
      }
      // this.setState({
      //   roles: [...this.state.roles]
      // });
    } else {
      message.error("更新权限失败");
    }
  };
  UNSAFE_componentWillMount() {
    this.initColumn();
  }
  componentDidMount() {
    this.getRoles();
  }
  render() {
    const { roles, role, isShowAdd, isShowAuth } = this.state;
    const title = (
      <span>
        <Button
          type="primary"
          style={{ margin: "0 15px" }}
          onClick={() => this.setState({ isShowAdd: true })}
        >
          创建角色
        </Button>
        <Button
          type="primary"
          disabled={!role._id}
          onClick={() => this.setState({ isShowAuth: true })}
        >
          创建角色权限
        </Button>
      </span>
    );
    return (
      <Card title={title}>
        <Table
          bordered
          rowKey="_id"
          dataSource={roles}
          columns={this.columns}
          pagination={{
            defaultPageSize: PAGE_SIZE
          }}
          rowSelection={{
            type: "radio",
            selectedRowKeys: [role._id],
            onSelect: role => {
              this.setState({ role });
            }
          }}
          onRow={this.onRowHandle}
        ></Table>
        <Modal
          title="添加角色"
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={() => {
            this.setState({ isShowAdd: false });
            this.form.resetFields();
          }}
        >
          <Test />
          <AddForm setForm={form => (this.form = form)}></AddForm>
        </Modal>
        <Modal
          title="添加角色权限"
          visible={isShowAuth}
          onOk={this.addRoleAuth}
          onCancel={() => {
            this.setState({ isShowAuth: false });
          }}
        >
          <AuthForm role={role} ref={this.authRef} />
        </Modal>
      </Card>
    );
  }
}

export default withRouter(Role);
