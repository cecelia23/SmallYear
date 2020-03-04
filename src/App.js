import React from 'react';
import logo from './logo.svg';
// import NaviBar from './components/navi';
import Clock from './pages/Clock.js';
import Login from './pages/login';
import UserList from './pages/users';

import {BrowserRouter as Router,
    Switch,
    Route,
    Link} from 'react-router-dom';
// import ShowInput from './components/showInput.js';
// import Button from './components/Button.js';
// import Check from './components/check.js';
// import TextArea from './components/textarea.js';
// import Twins from './components/ref.js';
// import Count from './components/lifecycle.js';
// import Toggle from './components/toggle.js';
// import MyRef from './components/createRef';
// import LogControl from './components/logControl.js';
// import NameForm from './components/form1.js';
// import SelectForm from './components/form2.js';
// import Reservation from './components/form3.js';
// import RefDemo from './components/form4'
// import Temperature from './components/temperature';
// import SignUpDialog from './components/dialog';
// import List from './components/list';
// import  ContainerUI from './components/store_test';
// import ContainerUI from './components/flux_reduce_store';
// import ContainerUI from './reflux/react_reflux';
import {actions} from './redux/index';
import { connect } from 'react-redux';
import './App.css';
// import Store from './data/store';

class App extends React.Component {
  render () {
    return (
      <div className="App">
        {/* <header className="App-header"> */}
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          {/* <Button />
          <RefDemo />
          <ContainerUI /> */}
          {/* <ShowInput /> */}
          {/* <List />  */}
          {/* <MyRef /> */}
          {/* <Count />
          <div id='lifecycle'></div>
          <TextArea />
          <Check/>
          <Twins/>
          <Toggle /> 
          <NameForm /> */}
          {/* <SelectForm /> */}
          {/* <Reservation /> */}
          {/* <LogControl isLogIn={true}/> */}
          {/* <Temperature scale='c' />
          <SignUpDialog /> */}
        {/* </header> */}
        <main>
          <Router>
            <nav>
              <ul>
                <li>
                  <Link to="/">Login</Link>
                </li>
                <li>
                  <Link to="/clock">Clock</Link>
                </li>
                <li>
                  <Link to="/users">Users</Link>
                </li>
              </ul>
            </nav>

            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/clock">
                <Clock />
              </Route>
              <Route path="/users">
                <UserList />
              </Route>
              <Route path="/">
                <Login />
              </Route>
            </Switch>
          </Router>
        </main>
      </div>
    );
  }
}


export default connect(state => state, actions)(App);
