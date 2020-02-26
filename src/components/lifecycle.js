import React from 'react';
import ReactDOM from 'react-dom';

class Count extends React.Component {
    constructor() {
        super();
        this.state = {
            val: 0,
            m:2
        };
        this.update = this.update.bind(this);
    }
    update () {
        this.setState({
            val: this.state.val + 1
        });
    }
    // 该生命周期函数即将过时
    // componentWillMount () {
    //     console.log('componentWilMount');
    // }
    render () {
        console.log('render');
        return (
            <button onClick={this.update}>{ this.state.val * this.state.m }</button>
        )
    }    
    componentDidMount () {
        console.log('componentDidMount');
        // 模拟点击button, 实现数值变化
        this.inc = setInterval(this.update, 1000);
    }
    componentWillUnmount () {
        console.log('componentWillUnmount');
        clearInterval(this.inc);
    }
}

class Wrapper extends React.Component {
    mount () {
        ReactDOM.render(<Count/>, document.getElementById('lifecycle'));
    }
    unmount () {
        ReactDOM.unmountComponentAtNode(document.getElementById('lifecycle'));
    }
    render () {
        return (
            <div>
                <button onClick={this.mount.bind(this)}>mount</button>
                <button onClick={this.unmount.bind(this)}>unmount</button>
            </div>
        )
    }
}
export default Wrapper