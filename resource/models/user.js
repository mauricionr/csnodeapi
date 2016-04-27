'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
    token: { type: String, required: true },
    telefones: [{
        numero: Number,
        ddd: Number
    }],
    data_criacao: { type: Date, default: Date },
    data_atualizacao: { type: Date, default: Date },
    ultimo_login: { type: Date, default: Date }
}));