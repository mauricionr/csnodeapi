/*
Project:    Prevenda
Author:     
====================================== */
'use strict';

import React, { PropTypes } from 'react';
import { History } from 'react-router';
import Reflux from 'reflux';
import Header from './components/Header';
import UserStore from './stores/user';

const App = React.createClass({
    propTypes: {
        children: PropTypes.object
    },
    mixins: [
        History,
        Reflux.listenTo(UserStore, 'loginCompleted'),
        Reflux.listenTo(UserStore, 'registerCompleted'),
        Reflux.listenTo(UserStore, 'logOutCompleted')
    ],
    logOutCompleted() {
        this.history.replaceState(null, '/');
    },
    registerCompleted() {
        this.history.replaceState(null, '/home');
    },
    loginCompleted() {
        this.history.replaceState(null, '/home');
    },
    render() {
        return (
            <div id="outer-container" className="content">
                <Header usuario={UserStore.currentUser} pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } />
                <main id="page-wrap" className="col-md-12">
                    {this.props.children}
                </main>
            </div>
        );
    }
});

export default App;