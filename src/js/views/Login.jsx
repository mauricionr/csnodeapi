'use strict';

import React from 'react';
import { History } from 'react-router';

const Login = React.createClass({
    mixins:[
        History
    ],
    voltar(){
        this.context.history.goBack();  
    },
    render() {
        return (
            <div>
                <h1>Login</h1>
            </div>
        );
    }
});

export default Login;