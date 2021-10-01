const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Token = new Schema({
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
});

// Add plugin
Token.plugin(mongooseDelete, {
    overrideMethods: 'all'
});

module.exports = mongoose.model('Token', Token);
