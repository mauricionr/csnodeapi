/*
Project:    Prevenda
Author:     
====================================== */
'use strict';

import React, { PropTypes } from 'react';
import Header from './components/Header';

const App = React.createClass({
    propTypes: {children: PropTypes.object},
    render() {
        return (
            <div id="outer-container" className="content">
                <Header pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } />
                <main id="page-wrap" className="col-md-12">
                    {this.props.children}
                </main>
            </div>
        );
    }
});

export default App;