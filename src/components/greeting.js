import React from 'react';

function UserGreeting(props) {
    return <span>Welcome back!</span>;
  }
  
function GuestGreeting(props) {
    return <span>Please sign up.</span>;
}

class Greeting extends React.Component {
    render () {
        if (this.props.isLogIn) {
            return <UserGreeting />;
        } else {
            return <GuestGreeting />;
        }
    }
}
export default Greeting;