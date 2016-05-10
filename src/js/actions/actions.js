'use strict';

const Actions = Reflux.createActions([
    'login', //user login
    'loginCompleted',
    'logout', //user logout
    'logOutCompleted',
    'register',
    'registerCompleted',
]);

export default Actions;