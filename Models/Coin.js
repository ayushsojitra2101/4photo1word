const mongoose = require('mongoose');

const coinsSchema = new mongoose.Schema({
    userId: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    primary: {
        type: Number,
        required: true
    },
    secondary: {
        type: Number,
    }
});

const User = mongoose.model('coin', coinsSchema);

module.exports = User;

