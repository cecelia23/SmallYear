import React from 'react';
import ReactDOM from 'react-dom';
class RefDemo extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            inputVal: 'hello',
            selectVal: 'banana',
            sexVal: 'female',
            multiVal: ['A']
        }
        // this.handleChange = this.handleChange.bind(this);
        this.handleRadio = this.handleRadio.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // handleChange (e) {
    //     this.setState({
    //         inputVal: e.target.value
    //     })
    // }
    
    handleRadio (e) {
        this.setState({
            sexVal: e.target.value
        })
    }
    handleCheck (e) {
        let val = e.target.value;
        let index = this.state.multiVal.indexOf(val);
        if (index === -1) {
            this.state.multiVal.push(val);
        } else {
            this.state.multiVal.splice(index, 1);
        }
    }

    handleSubmit (e) {
        e.preventDefault();
        let formData = {
            // input: ReactDOM.findDOMNode(this.refs.inputVal).value,
            select: ReactDOM.findDOMNode(this.refs.selectVal).value,
            sex: this.state.sexVal,
            multi: this.state.multiVal
        }
        console.log(formData);
        // 通过ref, 调用自定义组件中的方法
        this.refs.sexComp.saySomething();
    }

    render () {
        return (
            <form onSubmit={this.handleSubmit}>
                {/* 通过ref获取焦点 */}
                <input type='text' ref={function(comp){ ReactDOM.findDOMNode(comp).focus() }} defaultValue={this.state.inputVal} /><br/>
                <select ref='selectVal' defaultValue={this.state.selectVal} >
                    <option value='banana'>banana</option>
                    <option value='apple'>apple</option>
                    <option value='pear'>pear</option>
                </select>
                <Radio ref='sexComp' handleRadio={ this.handleRadio } />
                <CheckBox handleCheck={ this.handleCheck} />
                <button type='submit'>提交</button>
            </form>
        )
    }
}

class Radio extends React.Component {
    saySomething () {
        alert("this is in Radio's component")
    }
    render () {
        return (
            <div>
                <input type='radio' name='sex' value='male' onChange={ this.props.handleRadio }/>male
                <input type='radio' name='sex' value='female' defaultChecked  onChange={ this.props.handleRadio }/>female
                <input type='radio' name='sex' value='unknown' onChange={ this.props.handleRadio }/>unknown
            </div>
        )
    }
}

class CheckBox extends React.Component {
    render () {
        return (
            <div>
                <input type='checkbox' name='multi' value='A' defaultChecked onChange={this.props.handleCheck} />A
                <input type='checkbox' name='multi' value='B' onChange={this.props.handleCheck} />B
                <input type='checkbox' name='multi' value='C' onChange={this.props.handleCheck} />C
            </div>
        )
    }
}
export default RefDemo