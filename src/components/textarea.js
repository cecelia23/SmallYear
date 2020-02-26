import React from 'react';

class TextArea extends React.Component {
    constructor () {
        super();
        this.state = {
            text: '----' 
        }
    }
    update (e) {
        this.setState({
            text: e.type
        })
    }
    render () {
        return (
            <div>
            <textarea
            onKeyPress={this.update.bind(this)}
            onCut={ this.update.bind(this) }
            onCopy= { this.update.bind(this)}
            onFocus = { this.update.bind(this)}
                cols='30'
                rows='10'
            />
            <span> { this.state.text }</span>
            </div>
        )
    }
}

export default TextArea