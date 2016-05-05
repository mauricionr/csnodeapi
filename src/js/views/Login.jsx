'use strict';

import React from 'react';
import LoginOrRegister from '../components/LoginOrRegister';

const Login = React.createClass({
    render() {
        return (
            <div>
                <LoginOrRegister pageName="Login" />
            </div>
        );
    }
});

export default Login;