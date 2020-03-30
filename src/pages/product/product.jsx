import React from "react";
import {Switch, Route, Redirect} from 'react-router-dom'

import ProductHome from './home';
import ProductUpdate from './update';
import ProductDetail from './detail';

class Product extends React.Component {
  render() {
    return (
      <Switch >
        <Route path="/product"  exact component={ProductHome} />
        <Route path="/product/addupdate" component={ProductUpdate} />
        <Route path="/product/detail" component={ProductDetail} />
        <Redirect to='/product'/>
      </Switch>
    );
  }
}

export default Product;
