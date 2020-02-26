import React from 'react';
import ReactDOM from 'react-dom';
import Action from '../data/action';
import dispatcher from '../data/dispatcher';
import Store from '../data/store';
const action = new Action();
const store = new Store(dispatcher);

// controller-view
class List extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            list: []
        }
    }
    componentDidMount() {
        action.getAll();
        store.on('change', list => {
            this.setState({list});
        })
        store.on('message', (data) => {
            // console.log(data);
        })
    }

    add (item) {
        // 伪代码
        // store._add(ReactDOM.findDOMNode(this.refs.nameInput).value);
        action.add(ReactDOM.findDOMNode(this.refs.nameInput).value);
    }
    render () {
        return (
            <ul>
                { this.state.list.map(item => <li key={item}>{item}</li>) }
                <li>
                    <input ref='nameInput' defaultValue='put your name' />
                    <button onClick={this.add.bind(this)}>add</button>
                </li>
            </ul>
        )
    }
}

export default List