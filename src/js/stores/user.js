'use strict';

import Actions from '../actions/actions';

import client from '../util/MobileServices';

const DefaultUser = {
    nome: '',
    email: '',
    telefone: '',
    senha: ''
};

const UserStore = Reflux.createStore({
    listenables: [Actions],
    currentUser: Object.assign({}, DefaultUser),
    isLoggedIn: false,
    table: client.getTable('usuarios'),
    login(loginData) {
        this.table
            .where({ email: loginData.email, senha: loginData.senha })
            .read()
            .done((response) => this.loginCompleted(response), (error) => console.log(error));
    },
    loginCompleted(response) {
        this.isLoggedIn = true;
        this.currentUser = Object.assign({}, response[0]);
        this.trigger(this.currentUser);
    },
    register(loginData) {
        this.table
            .insert(loginData)
            .done((response) => this.registerCompleted(response), (error) => console.log(error));
    },
    registerCompleted(response) {
        this.isLoggedIn = true;
        this.currentUser = Object.assign({}, response[0]);
        this.trigger(this.currentUser);
    },
    logOut() {
        this.isLoggedIn = false;
        this.currentUser = Object.assign({}, DefaultUser);
        this.logOutCompleted();
    },
    logOutCompleted() {
        this.trigger(this.currentUser);
    }
});

export default UserStore;