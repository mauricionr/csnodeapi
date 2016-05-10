'use strict';

import React, { PropTypes } from 'react';

const LoginOrRegister = React.createClass({
    propTypes: {
        usuario: PropTypes.object,
        evento: PropTypes.func,
        pageName: PropTypes.string
    },
    call() {
        let ok = false;
        if (this.props.pageName !== 'Login') {
            if ('email' in this.state.usuario && 'telefone' in this.state.usuario && 'senha' in this.state.usuario && 'nome' in this.state.usuario) {
                ok = true;
            }
        } else {
            if ('email' in this.state.usuario && 'senha' in this.state.usuario) {
                ok = true;
            }
        }
        if (ok) {
            this.props.evento(this.state.usuario);
        } else {
            return false;
        }
    },
    handleChange() {
        let usuario = {};
        usuario.email = this.refs.email.value.trim();
        usuario.senha = this.refs.senha.value.trim();
        if (this.props.pageName !== 'Login') {
            usuario.nome = this.refs.nome.value;
            usuario.telefone = this.refs.telefone.value;
        }
        this.setState({ usuario });
    },
    render() {
        let elementsToRender = [];
        if (this.props.pageName !== 'Login') {
            elementsToRender.push({ type: 'text', ref: 'nome', onChange: this.handleChange, id: 'nome', placeholder: 'Nome' });
            elementsToRender.push({ type: 'number', ref: 'telefone', onChange: this.handleChange, id: 'telefone', placeholder: 'Telefone' });
        }
        let elements = elementsToRender.map((current, index) => (<div className="form-group">
            <label htmlFor={current.id}>Telefone</label>
            <input
                type={current.type}
                ref={current.ref}
                key={index}
                onChange={this.onChange}
                className="form-control"
                id={current.id}
                placeholder={current.placeholder} />
        </div>));
        return (
            <div>
                <strong>{this.props.pageName}</strong>
                <hr/>
                <div className="loginForm">
                    <div className="form-group">
                        <label htmlFor="usuario">Email address</label>
                        <input
                            type="email"
                            ref="email"
                            key="2"
                            onChange={this.handleChange}
                            className="form-control"
                            id="usuario"
                            placeholder="Email" />
                    </div>
                    {elements}
                    <div className="form-group">
                        <label htmlFor="senha">senha</label>
                        <input
                            type="password"
                            ref="senha"
                            key="3"
                            onChange={this.handleChange}
                            className="form-control"
                            id="senha"
                            placeholder="Senha" />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-default"
                        onClick={this.call}>Submit</button>
                </div>
            </div>
        );
    }
});

export default LoginOrRegister;
