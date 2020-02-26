const React = require('react');
const ReactDOM = require('react-dom');
const Dispatcher = require('flux').Dispatcher;
const dispatcher = new Dispatcher();
const Store = require('flux/utils').Store;

class MyStore extends Store {
    constructor(dispatcher) {
        super(dispatcher);
        this.list = [];
    }
    __onDispatch (action) {
        switch(action.type) {
            case 'add':
                this.list.push(action.data);
                console.log('1', this.list);
                this.__emitter.emit('change');
                break;
            default:
                this.data += 'in the default'
        }
    }
}

var store = new MyStore(dispatcher);

class ContainerUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }
    handleClick () {
        console.log('0', ReactDOM.findDOMNode(this.refs.input).value)
        dispatcher.dispatch({
            type: 'add',
            data: ReactDOM.findDOMNode(this.refs.input).value
        })
    }
    componentDidMount () {
        this.remove = store.addListener(() => {
            console.log('2')
            this.setState({
                list: store.list
            })
        })
    }
    componentWillUnmount () {
        this.remove();
    }
    render () { 
        let list = this.state.list.map(item => <li key={item}>{item}</li>);
        return <ul>
            <li>
                <input type='text' ref='input' defaultValue='' />
                <button onClick={ this.handleClick.bind(this) }> add </button>
            </li>
            {list}
        </ul>
    }
}

export default ContainerUI;




