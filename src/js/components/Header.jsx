'use strict';

import React, { PropTypes } from 'react';
import BurgerMenu from 'react-burger-menu';
import MenuWrap from './MenuWrap';
import UserStore from '../stores/user';

const Header = React.createClass({
    propTypes: {
        usuario: PropTypes.object
    },
    logOut() {
        UserStore.logOut();
    },
    render() {
        let elementsToRender = [];
        if (!this.props.usuario.id) {
            elementsToRender.push({ name: 'Login', path: '#/login' });
            elementsToRender.push({ name: 'Register', path: '#/register' });
        } else {
            elementsToRender.push({ name: 'Home', path: '#/home' });
            elementsToRender.push({ name: 'Logout', path: '#', onClick: this.logOut });
        }

        let elements = elementsToRender.map((current, index) => (<a className="center-block" onClick={current.onClick} key={index} href={current.path}>{current.name}</a>));
        let currentMenu = 'pushRotate';
        const Menu = BurgerMenu[currentMenu];
        return (
            <MenuWrap>
                <Menu id={ currentMenu } { ...this.state } right>
                    <nav className="bm-item-list">
                        <a className="center-block" href="#/">Inicio</a>
                        {elements}
                    </nav>
                </Menu>
            </MenuWrap>
        );
    }
});

export default Header;