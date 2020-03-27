import React from "react";
import { Card, Select, Input, Button, Icon, Table,message } from "antd";
import LinkButton from "../../components/link-button";
import { reqProduct, reqSearchProducts, reqUpdateProductStatus } from "../../api";
import { PAGE_SIZE } from "../../config/default";

const { Option } = Select;

class ProductHome extends React.Component {
  state = {
    products: [],
    loading: false,
    total: 0,
    searchType: "name", // 默认按商品名称搜索
    searchValue: ""
  };

  initColumn() {
    this.columns = [
      {
        title: "商品名称",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "商品描述",
        dataIndex: "sc",
        key: "sc"
      },
      {
        title: "价格",
        dataIndex: "price",
        render: price => "￥" + price
      },
      {
        title: "状态",
        width: 100,
        render: product => {
          return (
            <span>
              <Button type="primary" onClick={() => this.updateStatus(product._id, product.status)}>{product.status === 1 ? "下架" : "上架"}</Button>
              {product.status === 1 ? "在售" : "已下架"}
            </span>
          );
        }
      },
      {
        title: "操作",
        width: 100,
        render: product => {
          return (
            <span>
              {/* 这里要携带state对象，此方式只支持browserRouter */}
              <LinkButton onClick={() => this.props.history.push('/product/detail', {product})}>详情</LinkButton>
              <LinkButton onClick={() => this.props.history.push('/product/addupdate',{product})}>修改</LinkButton>
            </span>
          );
        }
      }
    ];
  }
  updateStatus = async (_id, status) => {
    if (status === 0) {
      status = 1;
    } else {
      status = 0;
    }
    const result = await reqUpdateProductStatus(_id, status);
    if (result.status === 0) {
      message.success('更新商品成功');
      this.getProduct(this.pageNum);
    }
  }
  getProduct = async pageNum => {
    //保存pageNum.以备更新时使用
    this.pageNum = pageNum;
    this.setState({
      loading: true
    });
    const {searchType, searchValue} = this.state;
    let result;
    if (searchValue) {
        result = await reqSearchProducts(pageNum, PAGE_SIZE, searchType, searchValue)
    } else {
        result = await reqProduct(pageNum, PAGE_SIZE);
    }
    this.setState({
      loading: false
    });
    if (result.status === 0) {
      const { total, list } = result;
      if (total && list !== []) {
        this.setState({
          products: list,
          total
        });
      }
    }
  };
  componentDidMount() {
    this.getProduct(1);
  }
  render() {
    const { products, loading, total, searchType, searchValue } = this.state;
    this.initColumn();
    const title = (
      <span>
        <Select
          value={searchType}
          onChange={value => {
            this.setState({ searchType: value });
          }}
          style={{ width: 150 }}
        >
          <Option value="name">按名称搜索</Option>
          <Option value="sc">按描述搜索</Option>
        </Select>
        <Input
          placehold="关键字"
          value={searchValue}
          onChange={event => this.setState({ searchValue: event.target.value })}
          style={{ width: 150, margin: "0 15px" }}
        />
        <Button type="primary" onClick={() => this.getProduct(1)}>搜索</Button>
      </span>
    );
    const extra = (
      <Button type="primary" onClick={()=> this.props.history.push('/product/addupdate')}>
        <Icon type="plus" />
        增加商品
      </Button>
    );
    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          rowKey="_id"
          loading={loading}
          dataSource={products}
          columns={this.columns}
          pagination={{
            defaultPageSize: PAGE_SIZE,
            total,
            showQuickJumper: true,
            onChange: this.getProduct
          }}
        ></Table>
      </Card>
    );
  }
}

export default ProductHome;
