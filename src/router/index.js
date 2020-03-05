import React from 'react';
import { BrowserRouter as Router,
        Switch,
        Route } from 'react-router-dom';
import loadable from '@loadable/component'
import Clock from '../pages/Clock';
import UserList from '../pages/users';
const loadableLogin = loadable(() => import('../pages/login'));

export default class RouteConfig extends React.Component {
    render () {
        return (
            <Router>
                <Switch>
                <Route path="/clock">
                    <Clock />
                </Route>
                <Route path="/users">
                    <UserList />
                </Route>
                <Route path="/" component={loadableLogin}></Route>
                </Switch>
            </Router>
        )
    }
}