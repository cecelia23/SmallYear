import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
// use 'useHistory' hook
// 使用function不能用class ... extends
function UserList (props){
    const history = useHistory();
    function handleClick (e) {
        history.push('/clock');
    }
    const users = props.users.map((user,index) => <li key={index}>{user.name}</li>);
    return (
        <div>
            <ul>
                { users }
            </ul>
            <button onClick={handleClick}>Go Back To Clock!</button>
        </div>
    )
}

export default connect(state => state)(UserList);