const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Music = new Schema({
    idUser: {type: String, required:true},
    name: { type: String, required: true },
    author: { type: String, required: true },
    image: { type: String , required: true},
    slug: { type: String, slug: 'name', unique: true },
    videoId: { type: String, required: true },
    genre: { type: String, required: true },
    description: {type: String}
}, {
    timestamps: true,
});

// Add plugin
mongoose.plugin(slug);
Music.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
});

module.exports = mongoose.model('Music', Music);
