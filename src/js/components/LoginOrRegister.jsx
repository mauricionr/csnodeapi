'use strict';

import React from 'react';

const LoginOrRegister = React.createClass({
    render() {
        return (
            <form className="loginForm">
                <div className="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" />
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
            </form>
        );
    }
});

export default LoginOrRegister;
