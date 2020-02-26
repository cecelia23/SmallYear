import React from 'react';

class FancyBorder extends React.Component {
    render () {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

function Dialog(props) {
    return (
        <FancyBorder color='blue'>
            <h1>
                {props.title}
            </h1>
            <p>
                {props.content}
            </p>
            {props.children}
        </FancyBorder>
    )
}

class SignUpDialog extends React.Component {
    constructor (props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.state ={
            login: ''
        }
    }
    handleChange (e) {
        this.setState({
            login: e.target.value
        })
    }
    handleSignUp (e) {
        console.log('welcome abord, ', this.state.login);
    }
    render () {
        return (
            <Dialog>
                <input value={this.state.login} onChange={this.handleChange}/>
                <button onClick={this.handleSignUp}>sign me up</button>
            </Dialog>
        )
    }
}

export default SignUpDialog

    
