import React from 'react';
const Store = require('flux/utils').ReduceStore;
const Dispatcher = require('flux').Dispatcher;
const dispatcher = new Dispatcher();

class MyStore extends Store {
    // ReduceStore中需要重写以下两个方法：
    getInitialState () {
        return {
            year: 2020,
            month: 2,
            date: 26
        }
    }
    // 返回一个State
    reduce(oldState, action) {
        switch (action.type) {
            case 'add':
                return {
                    year: 2020,
                    month: 2,
                    date: oldState.date + 1
                }
            default:
                return oldState
        }

    }
}
const store = new MyStore(dispatcher);

class ContainerUI extends React.Component {
    handleClick () {
        dispatcher.dispatch({
            type: 'add'
        })
    }
    componentDidMount () {
        this.remove = store.addListener(() => {
            console.log(store.getState())
        })
    }
    componentWillUnmount () {
        this.remove();
    }
    render () { 
        return <ul>
            <li>
                <button onClick={ this.handleClick.bind(this) }> new day comes!</button>
            </li>
        </ul>
    }
}

export default ContainerUI;



