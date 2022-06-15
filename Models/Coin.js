const mongoose = require('mongoose');

const coinsSchema = new mongoose.Schema({
    userId: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    primary: {
        type: String,
        required: true,
        unique: true
    },
    secondary: {
        type: String,
    }
});

const User = mongoose.model('coin', coinsSchema);

module.exports = User;

