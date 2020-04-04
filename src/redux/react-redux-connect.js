import React from 'react';
import {changeName} from './action';
import {connect} from 'react-redux';

class ReduxUI extends React.Component {
    handleClick (e) {
        this.props.access();
    }
    render () {
        return (
            <div>
                <p>{ this.props.name }</p>
                <input onChange={e => this.props.changeName(e.target.value) } />
                <button onClick={this.handleClick.bind(this) }>access</button>
            </div>
        )
    }
}

const mapStateToProps = (state, Props) => {
    return {
        name: state.name
    }
}

export default connect(mapStateToProps, {changeName})(ReduxUI);
