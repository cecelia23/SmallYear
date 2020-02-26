import React from 'react';

class SelectForm extends React.Component {
    constructor (props) {
        super(props);
        this.state ={
            value: 'coconut'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange (e) {
        this.setState({
            value: e.target.value
        })
    }
    handleSubmit (e) {
        console.log('selected:', this.state.value);
        e.preventDefault();
    }
    render () {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    pick your favorite fruite:
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value='apple'>apple</option>
                        <option value='pear'>pear</option>
                        <option value='banana'>banana</option>
                        <option value='coconut'>coconut</option>
                    </select>
                </label>
                <input type='submit' value='print' />
            </form>
        )
    }
}

export default SelectForm