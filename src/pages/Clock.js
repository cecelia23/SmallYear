import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { connect } from "react-redux";
// import { connect } from "../libs/react-redux";
import { increment, decrement, asyncIncrement } from "../redux/action";

class Clock extends React.Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    asyncIncrement: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    // this.state={} can only in constructor
    this.state = {
      date: new Date(),
    };
    this.numRef = React.createRef();
  }
  tick() {
    this.setState({
      date: new Date(),
    });
  }
  increment() {
    const number = this.numRef.current.value * 1;
    this.props.increment(number);
  }
  decrement() {
    const number = this.numRef.current.value * 1;
    this.props.decrement(number);
  }
  asyncIncrement() {
    const number = this.numRef.current.value * 1;
    this.props.asyncIncrement(number);
  }
  componentDidMount() {
    // this.timeId = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timeId);
  }
  render() {
    const count = this.props.count;
    return (
      <div>
        <h1>hello world</h1>
        <h2>it is {this.state.date.toLocaleString()}</h2>
        <h2>click {count} times</h2>
        <div>
          <input type="number" ref={this.numRef} defaultValue={1} />
          &nbsp;&nbsp;
          <Button onClick={() => this.increment()}>+</Button>&nbsp;&nbsp;
          <Button onClick={() => this.decrement()}>-</Button>&nbsp;&nbsp;
          <Button onClick={() => this.asyncIncrement()}>
            {" "}
            ASYNC INCREMENT
          </Button>
          &nbsp;&nbsp;
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  count: state.reducer.count,
});
// 要向哪个组件传递属性，就给哪个组件包裹容器组件
export default connect(mapStateToProps, {
  increment,
  decrement,
  asyncIncrement,
})(Clock);
