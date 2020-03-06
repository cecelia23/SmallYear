import React from 'react';
// import logo from './logo.svg';

import {Switch, Route, Link, NavLink, Redirect} from 'react-router-dom';
import loadable from '@loadable/component';
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
import Clock from './pages/Clock';
import UserList from './pages/users';
import './App.css';
// import Store from './data/store';


const Login = loadable(() => import('./pages/login'));
const BlogPost = loadable(() => import('./pages/blog'));
function App () {
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
          <nav>
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/clock">Clock</Link>
              </li>
              <li>
                <Link to="/">Users</Link>
              </li>
              <li>
                <NavLink to="/blog/hello">Blog</NavLink>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/login" exact>
              <Login />
            </Route>
            <Route path="/clock" exact>
                <Clock />
            </Route>
            <Route path="/:name/:num" exact component={BlogPost} />
            <Route path="/" exact>
                <UserList />
            </Route>
            <Redirect to='/'></Redirect>
          </Switch>
        </main>
      </div>
    );
}


export default connect(state => state, actions)(App);
