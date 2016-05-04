'use strict';

import React from 'react';
import { History } from 'react-router';

const uhOh = React.createClass({
    mixins:[
        History
    ],
    voltar(){
        this.context.history.goBack();  
    },
    render() {
        return (
            <div className="content full-width">
                <h1>{ 'That Page Doesn\'t Exist' }</h1>
                <p>
                    <a onClick={this.voltar}>Voltar</a>
                </p>
            </div>
        );
    }
});

export default uhOh;
