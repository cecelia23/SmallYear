import React from 'react';

class Test extends React.Component {
    state = {
      count: 0
    };
    // handleClick = () => {};
    componentDidMount() {
      // 异步
      this.setState({
        count: this.state.count + 1
      });
      this.setState({
        count: this.state.count + 1    // 1
      });
      console.log(this.state.count);    // 2==>0
      // 异步
      this.setState(state => ({ count: state.count + 1 }));   // 2
      this.setState(state => ({ count: state.count + 1 }));   // 3
      console.log(this.state.count);    // 3==>0
  
      setTimeout(() => {
        this.setState({ count: this.state.count + 1 });   //6
        console.log("timeout", this.state.count);          // 10==>6
  
        this.setState({ count: this.state.count + 1 });    //7
        console.log("timeout", this.state.count);       //  12==>7
      });
  
      Promise.resolve().then(value => {
        this.setState({ count: this.state.count + 1 });  // 4
        console.log("promise", this.state.count);     // 6==>4
  
        this.setState({ count: this.state.count + 1 });   //5
        console.log("promise", this.state.count);    // 8==>5
      });
    }
    render() {
      const { count } = this.state;
      console.log("render", count);   // 1==>0  4==>3 5==>4 7==>5  9==>6  11=>7
      return (
        <div>
          <p>{count}</p>
          {/* <button onClick={() => this.handleClick}>更新</button> */}
        </div>
      );
    }
  }

  export default Test;