import React from 'react';
import Greeting from './greeting.js'

class Toggle extends React.Component {
    constructor () {
        super();
        this.state = {
            isToggle: false
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick () {
        this.setState(state => ({
            isToggle: !state.isToggle
        }))

        console.log(this.state.isToggle);
    }
    render () {
        return (
            <div>
                <button onClick={this.handleClick}>{ this.state.isToggle ? 'ON' : 'OFF' }</button>
                <Greeting isLogIn={ this.state.isToggle } />
            </div>
        )
    }
}

export default Toggle