import React from 'react';

class MyRef extends React.Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
    }
    render () {
        return (
            <div>
            createRef自动获取焦点 <input type='text' ref={this.inputRef} />
            </div>
        )
    }
    componentDidMount() {
        // 自动获取焦点
        this.inputRef.current.focus();
    }
}

export default MyRef;