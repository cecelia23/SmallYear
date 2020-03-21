import React from "react";
import "./category.less";
import { Card, Button, Icon, Table, message, Modal } from "antd";
import LinkButton from "../../components/link-button";
import UpdateForm from "./update-form";
import AddForm from "./add-form";
import {
  reqCategorys,
  reqUpdateCategoty,
  reqAddCategoty
} from "../../api/index";

class Category extends React.Component {
  state = {
    dataSource: [] /* 一级分类列表 */,
    subCategotys: [] /* 二级分类列表 */,
    loading: false,
    parentId: 0 /* 上一级ID */,
    parentName: "" /* 上一级分类名称*/,
    modalState: 0 /* 控制两个蒙层的状态，0：都不显示，1：显示添加，2：显示更新 */
  };
  initColumns = () => {
    this.columns = [
      {
        title: "分类信息",
        dataIndex: "name",
        key: "name",
        width: 300
      },
      {
        title: "操作",
        width: 300,
        render: category => (
          <span>
            <LinkButton onClick={() => this.showUpdateCategory(category)}>
              修改分类
            </LinkButton>
            {/* onClick={this.updateParentId(category)} updateParentId函数会在组件一渲染时就调用，要想让其在点击时被调用，需要用箭头函数 */}
            {/* 如何向事件回调函数传递参数：先定义一个匿名函数，在匿名函数中调用处理函数, 并向处理函数传入参数*/}
            {this.state.parentId === 0 ? (
              <LinkButton onClick={() => this.updateParentId(category)}>
                查看子分类
              </LinkButton>
            ) : null}
          </span>
        )
      }
    ];
  };
  // 异步获取一级/二级分类列表
  getCategorys = async () => {
    // 发请求前
    this.setState({
      loading: true
    });
    const { parentId } = this.state;
    const data = await reqCategorys(parentId);
    if (data.status === 0) {
      this.setState({
        loading: false
      });
      // 取出分类数组数据
      const categorys = data.data;
      if (this.state.parentId === 0) {
        this.setState({
          dataSource: categorys
        });
      } else {
        this.setState({
          subCategotys: categorys
        });
      }
    } else {
      message.error("获取分类列表信息失败");
    }
  };
  updateParentId = category => {
    // 获取二级列表前，先更新状态
    //   setState()是异步更新状态
    this.setState(
      {
        parentId: category._id,
        parentName: category.name
      },
      () => {
        this.getCategorys(this.state.parentId);
      }
    );
  };
  showFirstCategory = () => {
    //   返回一级分类列表请求前的状态
    this.setState({
      subCategotys: [],
      parentId: 0,
      parentName: ""
    });
  };
  /* 显示添加蒙层*/
  showAddCategory = () => {
    this.setState({
      modalState: 1
    });
  };
  /* 显示更新蒙层*/
  showUpdateCategory = object => {
    // 获取该行category对象的name属性
    this.category = object;

    this.setState({
      modalState: 2
    });
  };
  /* 蒙层取消 */
  handleCancal = () => {
    this.form.resetFields();
    this.setState({
      modalState: 0
    });
  };
  /* 点击添加 */
  addCategory = () => {
    console.log("addCategory()");
    this.form.validateFields(async (err, values) => {
      if (!err) {
        // 准备数据
        const categoryName = values["categoryName"];
        const parentId = values["parentId"];
        // 清除
        this.form.resetFields();
        // 隐藏蒙层
        this.setState({
          modalState: 0
        });
        const result = await reqAddCategoty(categoryName, parentId);
        if (result.status === 0) {
          console.log(result.data);
        }
      } else {
        message.error("分类名称不能为空");
      }
    });
  };
  /* 点击更新*/
  updateCategory = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        // 准备数据
        const categoryId = this.category._id;
        const categoryName = this.form.getFieldValue("categoryName");

        // 重置表单数据
        this.form.resetFields();
        // 隐藏modal
        this.setState({
          modalState: 0
        });
        // 发送更新列表请求
        const result = await reqUpdateCategoty({ categoryName, categoryId });
        if (result.status === 0) {
          // 重新显示列表
          // this.getCategorys();
          console.log(result.data);
        }
      } else {
          message.error('分类信息不能为空')
      }
    });
  };
  bindForm(form) {
    this.form = form;
  }
  componentWillMount() {
    this.initColumns();
  }
  componentDidMount() {
    this.getCategorys();
  }
  render() {
    const extra = (
      <Button type="primary" onClick={this.showAddCategory}>
        <Icon type="plus"></Icon>
        添加
      </Button>
    );

    const {
      loading,
      dataSource,
      subCategotys,
      parentId,
      parentName
    } = this.state;

    const { name = "" } = this.category || {};

    return (
      <Card
        // 左上信息
        title={
          parentId === 0 ? (
            "一级分类信息"
          ) : (
            <span>
              <LinkButton onClick={this.showFirstCategory}>
                一级分类信息
              </LinkButton>
              <Icon type="arrow-right" style={{ marginRight: "5px" }}></Icon>
              <span>{parentName}</span>
            </span>
          )
        }
        // 右上角
        extra={extra}
        className="card"
      >
        <Table
          bordered
          rowKey="_id"
          pagination={{ defaultPageSize: 5 }}
          loading={loading}
          dataSource={parentId === 0 ? dataSource : subCategotys}
          columns={this.columns}
        />
        <Modal
          title="添加分类"
          visible={this.state.modalState === 1}
          onOK={this.addCategory}
          onCancel={this.addCategory}
        >
          <AddForm
            categorys={dataSource}
            parentId={parentId}
            setForm={this.bindForm.bind(this)}
          />
        </Modal>

        <Modal
          title="更新分类"
          visible={this.state.modalState === 2}
          onOK={this.updateCategory}
          onCancel={this.updateCategory}
        >
          <UpdateForm categoryName={name} setForm={this.bindForm.bind(this)} />
        </Modal>
      </Card>
    );
  }
}

export default Category;
