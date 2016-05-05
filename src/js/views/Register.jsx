'use strict';

import React from 'react';
import LoginOrRegister from '../components/LoginOrRegister';

const Register = React.createClass({
    render() {
        return (
            <div>
                <LoginOrRegister pageName="Register"/>
            </div>
        );
    }
});

export default Register;