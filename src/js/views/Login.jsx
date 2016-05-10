'use strict';

//import Reflux from 'reflux';
import LoginOrRegister from '../components/LoginOrRegister';
import UserStore from '../stores/user';

const Login = React.createClass({
    getInitialState() {
        return {
            usuario: {}
        };
    },
    login(usuario) {
        UserStore.login(usuario);
    },
    render() {
        return (
            <div>
                <LoginOrRegister pageName={'Login'} evento={this.login} usuario={this.state.usuario}/>
            </div>
        );
    }
});

export default Login;