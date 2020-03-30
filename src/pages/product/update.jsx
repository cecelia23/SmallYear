import React from "react";
import { Card, Form, Input, Cascader, Button, Icon, message } from "antd";
import LinkButton from "../../components/link-button";
import { reqCategorys, reqAddProduct } from "../../api";
import PicturesWall from "./picture-wall";
import RichTextEditor from "./rich-text-editor";

class ProductUpdate extends React.Component {
  constructor(props) {
    super(props);
    // 创建一个用于保存ref的容器
    this.myRef = React.createRef();
    this.editor = React.createRef();
  }
  state = {
    options: []
  };
  submit = () => {
    const form = this.props.form;
    form.validateFields(async (err, values) => {
      if (err) {
        alert(err.message);
      } else {
        const { name, sc, price, category } = values;
        var categoryId, pcategoryId;
        if (category.length === 2) {
          categoryId = category[1];
          pcategoryId = category[0];
        } else {
          pcategoryId = 0;
          categoryId = category[0];
        }
        const images = this.myRef.current.getImgs();
        const detail = this.editor.current.getDetail();
        const result = await reqAddProduct(
          this.isUpdate,
          this.product._id,
          name,
          sc,
          price,
          categoryId,
          pcategoryId,
          images,
          detail
        );
        if (result.status === 0) {
          message.success(`${this.isUpdate ? "修改" : "添加"} 商品成功！`);
          this.props.history.goBack();
        } else {
          message.error(`${this.isUpdate ? "修改" : "添加"} 商品失败！`);
        }
      }
    });
  };
  validatePrice = (rule, value, callback) => {
    if (parseInt(value) > 0) {
      callback();
    } else {
      callback("商品价格必须大于0");
    }
  };
  // 获取一级/二级分类列表
  getCategorys = async parentId => {
    // 请求
    const result = await reqCategorys(parentId);

    var list;
    if (result.status === 0) {
      list = result.data;
      if (!parentId) {
        // 初始化一级分类
        this.initOptions(list);
      } else {
        // 二级分类列表可能存在，也可能不存在
        return list; //返回一个成功的promise，其值为list数组
      }
    }
  };
  initOptions = async categorys => {
    // 对一级分类列表重新包装
    categorys = categorys.map(item => ({
      label: item.name,
      value: item._id,
      isLeaf: false
    }));
    // 如果是修改更新，还要将对应商品的二级分类预加载
    const { isUpdate, product } = this;
    const { pcategoryId } = product;
    if (isUpdate && pcategoryId) {
      // 获取二级分类列表
      const subCategory = await this.getCategorys(pcategoryId);
      // 生成二级下拉列表
      const childOptions = subCategory.map(item => ({
        label: item.name,
        value: item._id,
        isLeaf: false
      }));
      // 关联到对应的一级菜单项
      const targetOption = categorys.find(item => item.value === pcategoryId);

      targetOption.children = childOptions;
    }

    this.setState({
      options: categorys
    });
  };

  loadData = async selectedOptions => {
    // 选中的数组第一项（选中项）
    const targetOption = selectedOptions[0];
    // 显示loading效果
    targetOption.loading = true;
    // 根据选中的分类，获取下一级分类列表
    const subCategory = await this.getCategorys(targetOption.value);
    // 隐藏loading
    targetOption.loading = false;
    // 存在二级分类列表
    if (subCategory && subCategory.length > 0) {
      const subOptions = subCategory.map(item => ({
        label: item.name,
        value: item._id,
        isLeaf: true
      }));
      targetOption.children = subOptions;
    } else {
      // 无二级分类列表
      targetOption.isLeaf = true;
    }
    // 更新state中的options
    this.setState({
      options: [...this.state.options]
    });
  };

  componentDidMount() {
    this.getCategorys();
  }
  render() {
    this.isUpdate = false;
    this.product = {};
    if (this.props.location.state) {
      const { product } = this.props.location.state;
      this.isUpdate = !!product;
      this.product = product || {};
    }
    const { pcategoryId, categoryId, imgs, detail } = this.product;

    // 如果是修改，放入级联分类ID
    let categoryIds = [];
    if (this.isUpdate) {
      // 商品是一级分类
      if (pcategoryId === 0) {
        categoryIds.push(categoryId);
      } else {
        // 是二级分类
        categoryIds.push(pcategoryId);
        categoryIds.push(categoryId);
      }
    }
    // this.getInitCategory();
    const title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <Icon type="arrow-left" className="back-arrow"></Icon>
        </LinkButton>
        <span>{this.isUpdate ? "修改商品" : "添加商品"}</span>
      </span>
    );
    const { Item } = Form;
    const { TextArea } = Input;
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 6 }
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <Card title={title} className="card">
        <Form {...formItemLayout}>
          <Item label="商品名称">
            {getFieldDecorator("name", {
              initialValue: this.product.name,
              rules: [
                {
                  required: true,
                  message: "必须输入商品名称"
                }
              ]
            })(<Input placeholder="请输入商品名称"></Input>)}
          </Item>
          <Item label="商品描述">
            {getFieldDecorator("sc", {
              initialValue: this.product.sc,
              rules: [
                {
                  required: true,
                  message: "必须输入商品描述"
                }
              ]
            })(
              <TextArea
                placeholder="请输入商品描述"
                autoSize={{ minRows: 2, maxRows: 6 }}
              />
            )}
          </Item>
          <Item label="商品价格">
            {getFieldDecorator("price", {
              initialValue: this.product.price,
              rules: [
                {
                  required: true,
                  message: "必须输入商品价格"
                },
                {
                  validator: this.validatePrice
                }
              ]
            })(
              <Input
                type="number"
                placeholder="请输入商品价格"
                addonAfter="元"
              />
            )}
          </Item>
          <Item label="商品分类">
            {getFieldDecorator("category", {
              initialValue: categoryIds,
              rules: [
                {
                  required: true,
                  message: "必须输入商品分类"
                }
              ]
            })(
              <Cascader
                options={this.state.options}
                loadData={this.loadData}
                onChange={this.onChange}
                changeOnSelect
              />
            )}
          </Item>
          <Item label="商品图片">
            {/* 将容器对象传递给子组件，子组件将自身装进容器 */}
            <PicturesWall ref={this.myRef} imgs={imgs} />
          </Item>
          <Item
            label="商品详情"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 20 }}
          >
            <RichTextEditor ref={this.editor} editor={detail} />
          </Item>
          <Item>
            <Button type="primary" onClick={this.submit.bind(this)}>
              提交
            </Button>
          </Item>
        </Form>
      </Card>
    );
  }
}

export default Form.create()(ProductUpdate);
