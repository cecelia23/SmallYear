import React from 'react';

class Boiling extends React.Component {
    render () {
        const temperature = this.props.temperature;
        const element = temperature > 100 ? <div>water would boil.</div>:<div>water would not boil.</div>;
        return element;
    }
}

const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
}

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function convert(temperature, func) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = func(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}


class Calculator extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            temperature: '',
            scale: 'c'
        }
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    }
    handleFahrenheitChange (temperature) {
        this.setState({
            temperature,
            scale: 'f'
        })
    }
    handleCelsiusChange (temperature) {
        this.setState({
            temperature,
            scale: 'c'
        })
    }
    render () {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const fahrenheit = scale === 'c' ? convert(temperature, toFahrenheit) : temperature;
        const celsius = scale === 'f' ? convert(temperature, toCelsius) : temperature;
        return (
            <div>
                fahrenheit temperature:
                <Temperature 
                scale='f' 
                temperature={fahrenheit} 
                temperatureChange={this.handleFahrenheitChange}/>
                celsius temperature:
                <Temperature  
                scale='c' 
                temperature={celsius} 
                temperatureChange={this.handleCelsiusChange}/>
                <Boiling temperature={celsius}/>
            </div>
        )
    }
}
class Temperature extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange (e) {
        this.props.temperatureChange(e.target.value);
    }
    render() {
        const scale = this.props.scale;
        const temperature = this.props.temperature;
        return (
            <fieldset>
                <legend>enter temperature in {scaleNames[scale]}:</legend>
                <input value={temperature} onChange={this.handleChange}/>
            </fieldset>
        )
    }
}

export default Calculator;