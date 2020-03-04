import React from 'react';
import { connect } from 'react-redux';

class UserList extends React.Component {
    render () {
        const users = this.props.users.map((user,index) => <li key={index}>{user.name}</li>)
        return (
            <ul>
                { users }
            </ul>
        )
    }
}

export default connect(state => state)(UserList);