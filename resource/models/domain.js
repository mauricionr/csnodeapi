'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Domain', new Schema({
    url: { type: String, required: true },
    data_criacao: { type: Date, default: Date },
    data_atualizacao: { type: Date, default: Date },
    ultimo_login: { type: Date, default: Date }
}));