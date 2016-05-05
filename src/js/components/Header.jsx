'use strict';

import React from 'react';
import BurgerMenu from 'react-burger-menu';
import MenuWrap from './MenuWrap';

const Header = React.createClass({
    render() {
        let currentMenu = 'pushRotate';
        const Menu = BurgerMenu[currentMenu];
        return ( 
            <MenuWrap>
                <Menu id={ currentMenu } { ...this.state } right>
                    <nav className="bm-item-list">
                        <a className="center-block" href="#/">Inicio</a>
                        <a className="center-block" href="#/login">Login</a>
                        <a className="center-block" href="#/register">Register</a>
                    </nav>
                </Menu>
            </MenuWrap> 
        );
    }
});

export default Header;