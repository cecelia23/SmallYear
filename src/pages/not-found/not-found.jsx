import React from "react";
import { Row, Col, Button } from "antd";
import { connect } from "react-redux";
import { setHeadTitle } from "../../redux/action";
import "./not-found.less";

class NotFound extends React.Component {
  goHome = () => {
    this.props.setHeadTitle("首页");
    this.props.history.replace("/home");
  };
  render() {
    return (
      <Row className="not-found">
        <Col span={12} className="left"></Col>
        <Col span={12} className="right">
          <h1>404</h1>
          <h2>抱歉，您所访问的页面不存在！</h2>
          <div>
            <Button type="primary" onClick={() => this.goHome()}>
              回到首页
            </Button>
          </div>
        </Col>
      </Row>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {};
};
export default connect(mapStateToProps, { setHeadTitle })(NotFound);
