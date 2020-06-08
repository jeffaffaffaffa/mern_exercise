const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    //single field username with several validations for the username
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
    },
}, {
    timestamps: true,
});

//creates User using the userSchema
const User = mongoose.model('User', userSchema);

module.exports = User;