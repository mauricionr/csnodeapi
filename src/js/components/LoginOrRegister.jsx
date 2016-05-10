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
        let elements = [];
        if (this.props.pageName !== 'Login') {
            elements.push((<div className="form-group">
                <label htmlFor="nome">Nome</label>
                <input
                    type="text"
                    key="0"
                    ref="nome"
                    onChange={this.handleChange}
                    className="form-control"
                    id="nome"
                    placeholder="Nome" />
            </div>));
            elements.push((<div className="form-group">
                <label htmlFor="telefone">Telefone</label>
                <input
                    type="number"
                    ref="telefone"
                    key="1"
                    onChange={this.handleChange}
                    className="form-control"
                    id="telefone"
                    placeholder="Telefone" />
            </div>));
        }
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
