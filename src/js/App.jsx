/*
Project:    Prevenda
Author:     
====================================== */
'use strict';

import React, { PropTypes } from 'react';
 
const App = React.createClass({
    propTypes: {children: PropTypes.object},
    render() {
        return (
            <div id="outer-container">
                <main id="page-wrap">
                    {this.props.children || <div>Hello World!</div>}
                </main>
            </div>
        );
    }
});

export default App;