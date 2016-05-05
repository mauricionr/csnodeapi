import React, { PropTypes } from 'react';

const MenuWrap = React.createClass({
    propTypes:{
        wait:PropTypes.number,
        children:PropTypes.node  
    },
    getInitialState() {
        return { hidden : false };
    },
    show() {
        this.setState({ hidden : false });
    },
    render() {
        let style;
        if (this.state.hidden) {
            style = { display: 'none' };
        }
        return (
            <div style={ style } className="right">
                { this.props.children }
            </div>
        );
    }
});

export default MenuWrap;