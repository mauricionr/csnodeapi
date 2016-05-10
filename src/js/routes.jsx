'use strict';

import React from 'react';
import { Router, Route, Redirect } from 'react-router';

import App from './App';
import UhOh from './views/404';
import Inicio from './views/Inicio';
import Login from './views/Login';
import Register from './views/Register';
import Home from './views/Home';

import UserStore from './stores/user';

export default (
    <Router>
        <Route component={ App }>
            <Route name="inicio" path="/" component={ Inicio } />
            <Route name="Login" path="/login" component={ Login } />
            <Route name="Register" path="/register" component={ Register } />
            <Route name="Home" path="/home" onEnter={requireAuth} component={ Home } />
            <Route name="404" path="/404" component={ UhOh } />
            <Redirect from="*" to="/404" />
        </Route>
    </Router>
);

function requireAuth(nextState, replaceState) {
    if (!UserStore.isLoggedIn) {
        replaceState(null, '/login');
    }
}