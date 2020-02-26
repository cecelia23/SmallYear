import React from 'react';

class NameForm extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            value: 'THIS IS A TEXTAREA DEMO'
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
        console.log('name has been summitted:', this.state.value);
        e.preventDefault();
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                Name:
                <textarea value={this.state.value} onChange={this.handleChange}></textarea>
                    {/* <input type='text' value={this.state.value} onChange={this.handleChange}/> */}
                </label>
                <input type='submit' value='submit'/>
            </form>
        )
    }
}

export default NameForm