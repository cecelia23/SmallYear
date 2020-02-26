import React from 'react';
import propTypes from 'prop-types';
// import RefDemo from './form4'

class Button extends React.Component {
    render () {
        return (
            <div>
            <Element color='red'>I <Like /> React</Element>
            {/* <RefDemo /> */}
            </div>
        )
    }
}

class Element extends React.Component { 
    render () {
        return (
            <button style={{color:this.props.color}}>{this.props.children}</button>
        )
    }
}
// const Element = (props) => 
//     <button style={{color:props.color}}>{ props.children }</button>

Element.propTypes = {
    color: propTypes.string.isRequired
}
Element.defaultProps = {
    color: 'blue'
}

class Like extends React.Component {
    render () {
        return (
            <span> &hearts; </span>
        )
    }
}

export default Button;