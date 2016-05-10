'use strict';

import LoginOrRegister from '../components/LoginOrRegister';
import UserStore from '../stores/user';

const Register = React.createClass({
    getInitialState() {
        return {
            usuario: {}
        };
    },
    register(usuario) {
        UserStore.register(usuario);
    },
    render() {
        return (
            <div>
                <LoginOrRegister pageName={'Register'} evento={this.register} usuario={this.state.usuario}/>
            </div>
        );
    }
});

export default Register;