import React from 'react';
import {actions} from './index';
import {connect} from 'react-redux';

class ReduxUI extends React.Component {
    handleClick (e) {
        this.props.access();
    }
    render () {
        return (
            <div>
                <p>{ this.props.name }</p>
                <p>{ this.props.num }</p>
                <input onChange={e => this.props.changeName(e.target.value) } />
                <button onClick={this.handleClick.bind(this) }>access</button>
            </div>
        )
    }
}

const mapStateToProps = (state, Props) => {
    return {
        num: state.num,
        name: state.name
    }
}
// const mapDispatchToProps = () => {
//     return actions;
// }
export default connect(mapStateToProps, actions)(ReduxUI);
