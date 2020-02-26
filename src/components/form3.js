import React from 'react';

class Reservation extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isGoing: true,
            numOfGuests: 2
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange (e) {
        const target = e.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked: target.value;
        this.setState({
            [name]: value
        })
        console.log(this.state);
    }
    render () {
        return (
            <form>
            <label>
                isGoing:
                <input 
                    type='checkbox'
                    value={this.state.isGoing}
                    name='isGoing'
                    onChange={this.handleInputChange}
                />
            </label>
            <br />
            <label>
                numberOfGuests:
                <input 
                    type='number'
                    value={this.state.numOfGuests}
                    name='numOfGuests'
                    onChange={this.handleInputChange}
                />
            </label>
            </form>
        )
    }
}

export default Reservation