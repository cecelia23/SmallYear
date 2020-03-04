import React from 'react';

class Clock extends React.Component{
    constructor (props) {
        super(props);
        // this.state={} can only in constructor
        this.state = {
            date: new Date()
        };
    }
    componentDidMount () {
        this.timeId = setInterval(
            () => this.tick(),
            1000);
    }
    componentWillUnmount () {
        clearInterval(this.timeId);
    }
    tick () {
        this.setState({
            date: new Date()
        })
    }
    render () {
        return (
            <div>
                <p>hello world</p>
                <h2>it is {this.state.date.toLocaleString()}</h2>
            </div>
        )
    }
}


export default Clock

