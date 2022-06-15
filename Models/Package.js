const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    package: {
        type: String,
        required: true
    },
    levels: [{ type: mongoose.Schema.Types.ObjectId, ref: "level" }],
});

const package = mongoose.model('Package', packageSchema);

module.exports = package;

