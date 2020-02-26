import React from 'react';

class ShowInput extends React.Component {
    constructor () {
        super();
        this.state = {
            txt: 'this is the txt state.',
            title: 'this state is not change'
        }
    }
    update (e) {
        this.setState({
            txt: e.target.value
        })
    }
    render () {
        return (
            <div>
                <p></p>
                <Widge update={this.update.bind(this)}/>
                <p>{this.state.title} - { this.state.txt }</p>
            </div>
        )
    }
    
}

const Widge = (props) => 
    <input type='text' onChange={props.update}/>

export default ShowInput