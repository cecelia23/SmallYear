import React from 'react';
import logo from './logo.svg';

import {Switch, Route, Redirect} from 'react-router-dom';
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
import NameForm from './components/form1.js';
// import SelectForm from './components/form2.js';
// import Reservation from './components/form3.js';
// import RefDemo from './components/form4'
// import Temperature from './components/temperature';
// import SignUpDialog from './components/dialog';
// import List from './components/list';
// import  ContainerUI from './components/store_test';
// import ContainerUI from './components/flux_reduce_store';
// import ContainerUI from './reflux/react_reflux';
import Sider from './components/menu';
import {actions} from './redux/index';
import { connect } from 'react-redux';
import Clock from './pages/Clock';
import UserList from './pages/users';
import './App.less';
// import Store from './data/store';

const Login = loadable(() => import('./pages/login copy'));
const BlogPost = loadable(() => import('./pages/blog'));
function App () {
    return (
      <div className="App">
        <header className="App-header">
          {/* <Button /> */}
          {/* <ShowInput /> */}
          {/* <List />  */}
          {/* <Count /> */}
          {/* <ContainerUI />  */}
          {/* <div id='lifecycle'></div> */}
          {/* <TextArea /> */}
          {/* <Check/> */}
          {/* <Twins/> */}
          {/* <Toggle />  */}
          {/* <RefDemo /> */}
          {/* <MyRef /> */}
          <NameForm />
          {/* <SelectForm /> */}
          {/* <Reservation /> */}
          {/* <LogControl isLogIn={true}/> */}
          {/* <Temperature scale='c' />
          <SignUpDialog /> */}
        </header>
        <main className='container'>
          {/* <nav >
            <div>
              <div className="App-link">
                <Link to="/login">Login</Link>
              </div>
              <div className="App-link">
                <Link to="/clock">短视频推广</Link>
              </div>
              <div className="App-link">
                <Link to="/">Users</Link>
              </div>
              <div className="App-link">
                <NavLink to="/blog/727" activeClassName='nav-link'>Blog</NavLink>
              </div>
            </div>
          </nav> */}
          <Sider />
          <section>
          <div className="route-content">
          <img src={logo} className="App-logo" alt="logo" />
          <Switch>
            <Route path="/" exact>
              <Login />
            </Route>
            <Route path="/clock" exact>
                <Clock />
            </Route>
            <Route path="/:name/:num" exact component={BlogPost} />
            <Route path="/user" exact>
                <UserList />
            </Route>
            <Redirect to='/'></Redirect>
          </Switch>
          </div>
          <footer>jiedi</footer>
          </section>
          {/* <footer>jiedi</footer> */}
        </main>
      </div>
    );
}


export default connect(state => state, actions)(App);
