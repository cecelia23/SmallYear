import React from "react";
import MyHeader from "../../components/header";
import LeftNav from "../../components/left-nav";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "../home/home";
import Category from "../category/category";
import Product from "../product/product";
import User from "../user/user";
import Role from "../role/role";
import Bar from "../bar/bar";
import Line from "../line/line";
import Pie from "../pie/pie";
import memoryUtil from "../../utils/menoryUtil";
import { Layout } from "antd";

const { Header, Footer, Sider, Content } = Layout;

class Admin extends React.Component {
  render() {
    const user = memoryUtil.user;
    if (!user || !user.id) {
      return <Redirect to="/login" />;
    }
    return (
      <Layout className="admin-container">
        <Sider style={{ backgroundColor: "#9966CC" }}>
          <LeftNav></LeftNav>
        </Sider>
        <Layout>
          <Header style={{ padding: "0", backgroundColor: "white",height:'88px' }}>
            <MyHeader></MyHeader>
          </Header>
          <Content style={{ backgroundColor: "#CCCCFF", minHeight: "500px" }}>
            <Switch>
              <Route path="/home" component={ Home}>
                {/* <Home /> */}
              </Route>
              <Route path="/category">
                <Category />
              </Route>
              <Route path="/product">
                <Product />
              </Route>
              <Route path="/user">
                <User />
              </Route>
              <Route path="/role">
                <Role />
              </Route>
              <Route path="/chart/bar">
                <Bar />
              </Route>
              <Route path="/chart/line">
                <Line />
              </Route>
              <Route path="/chart/pie">
                <Pie />
              </Route>
              <Redirect to='/home' />
            </Switch>
          </Content>
          <Footer>后台管理系统 in react</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Admin;
