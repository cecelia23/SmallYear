import React from 'react';
import ReactDOM from 'react-dom';

class Twins extends React.Component {
    constructor () {
        super();
        this.state = {
            a: '',
            b: ''
        }
    }
    update (e) {
        this.setState({
            a: ReactDOM.findDOMNode(this.a).value,
            b: ReactDOM.findDOMNode(this.b).value
        })
    }

    render () {
        return (
            <div>
                <Input
                ref={component => this.a = component}
                update={this.update.bind(this)} />
                <span>{this.state.a}</span> 
                <hr></hr>
                <Input
                ref={component => this.b = component}
                update={this.update.bind(this)} />
                <span>{this.state.b}</span>
            </div>
        )
    }
}

// const Input = (props) => 
// <input type='text' onChange={props.update} />

class Input extends React.Component {
    render () {
        return (
            <input type='text' onChange={this.props.update} />
        )
    }
}
export default Twins