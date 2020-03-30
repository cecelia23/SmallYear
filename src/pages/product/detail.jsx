import React from "react";
import { Card, Icon, List } from "antd";
import LinkButton from "../../components/link-button";
import {BASE_IMG_URL} from '../../config/default';
import { reqCategoryInfo } from '../../api';
import "./product.less";
const Item = List.Item;

class ProductDetail extends React.Component {
  state = {
    cname1: '',   // 一级分类名称
    cname2: '',  // 二级分类名称
  }
  getCategoryInfo = async () => {
    const {categoryId, pcategoryId} = this.props.location.state.product;
    if (pcategoryId === 0) {
      const result = await reqCategoryInfo(pcategoryId);
      this.setState({
        cname1: result.list.categoryName
      })
    } else {
      // 一次性发送多个请求，都成功了才返回
      const  results = await Promise.all([reqCategoryInfo(pcategoryId), reqCategoryInfo(categoryId)]);
      const cname1 = results[0].list[0].name;
      const cname2 = results[1].list[0].name;
      this.setState({
        cname1,
        cname2
      })
    }
  }
  componentDidMount() {
    this.getCategoryInfo();
  }
  render() {
    const { name, sc, price, img } = this.props.location.state.product;
    const {cname1, cname2} = this.state;
    const title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <Icon
            type="arrow-left"
            className="back-arrow"
          ></Icon>
        </LinkButton>
        <span>商品详情</span>
      </span>
    );
    return (
      <Card title={title} className="card">
        <List className="product-detail">
          <Item>
            <span className="left">商品名称</span>
            <span>{name}</span>
          </Item>
          <Item>
            <span className="left">商品描述</span>
            <span>{sc}</span>
          </Item>
          <Item>
            <span className="left">价格</span>
            <span>{price}</span>
          </Item>
          <Item>
            <span className="left">所属分类</span>
            <span>{cname1} {cname2? ' --> ' + cname2: ''}</span>
          </Item>
          <Item>
            <span className="left">商品图片</span>
            <span>
              <img src={BASE_IMG_URL + img} alt="tupian1" />
            </span>
          </Item>
          <Item>
            <span className="left">商品详情</span>
            {/* 利用react自身的属性 */}
            <span
              dangerouslySetInnerHTML={{
                __html: "<h1 style='color: red'>详情内容展示</h1>"
              }}
            ></span>
          </Item>
        </List>
      </Card>
    );
  }
}

export default ProductDetail;
