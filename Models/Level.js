const mongoose = require('mongoose');

const levelSchema = new mongoose.Schema({
    fullWord  : {
        type: String,
    },
    levelNum  : {
        type: Number,
    }
});

const level = mongoose.model('level', levelSchema);

module.exports = level;

