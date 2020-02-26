import React from 'react';
import Greeting from './greeting.js';

function LogIn(props) {
    return (
        <button onClick={props.change}>
            LogIn
        </button>
    )
}

function LogOut(props) {
    return (
        <button onClick={props.change}>
            LogOut
        </button>
    )
}

class LogControl extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            log: props.isLogIn
        }
    }
    logChange () {
        console.log(this.state.log);
        this.setState(state => ({
            log: !state.log
        }))
    }
    render () {
        // let com;
        // if (this.state.log) {
        //     com = <LogOut change={this.logChange.bind(this)} />;
        // } else {
        //     com = <LogIn change={this.logChange.bind(this)}/>;
        // }
        return (
            <div>
                <Greeting isLogIn={this.state.log}/>
                {/* {com} */}
                { this.state.log ? (
                        <LogOut change={this.logChange.bind(this)} />
                 ) : (
                        <LogIn change={this.logChange.bind(this)} />
                 )
                }
            </div>
        )
    }
}

export default LogControl;