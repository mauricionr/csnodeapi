'use strict';

import React from 'react';
import { Router, Route, Redirect } from 'react-router';

import App from './App';
import UhOh from './views/404';
import Inicio from './views/Inicio';
export default (
    <Router>
        <Route component={ App }>
            <Route name="inicio" path="/" component={ Inicio } />
            <Route name="404" path="/404" component={ UhOh } />
            <Redirect from="*" to="/404" />
        </Route> 
    </Router>
);