'use strict';

import React, { PropTypes} from 'react';

const LoginOrRegister = React.createClass({
    propTypes:{
        pageName:PropTypes.String  
    },
    render() {
        return (
            <div>
                <strong>{this.props.pageName}</strong>
                <hr/>
                <form className="loginForm">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-default">Submit</button>
                </form>
            </div>
        );
    }
});

export default LoginOrRegister;
