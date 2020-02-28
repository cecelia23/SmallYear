import { createAction, createStore } from 'reflux';
import React from 'react';

const action = createAction();
const store = createStore({
    init() {
        this.data = {num: 0};
        this.listenTo(action, this.onClick);
    },
    onClick () {
        this.data.num ++;
        this.trigger(this.data);
    }
})

class ContainerUI extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            num: 0
        }
    }
    componentDidMount () {
        this.unmount = store.listen(data => {
            this.setState({
                num: data.num
            })
        })
    }
    componentWillUnmont () {
        this.unmount();
    }
    render () {
        return (
            <div>
                { this.state.num }
                <button onClick={action}>自增</button>
            </div>
        )
    }
}
export default ContainerUI;