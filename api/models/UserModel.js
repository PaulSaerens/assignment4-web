const mongoose = require('mongoose')
const passportLocal = require('passport-local-mongoose')

/**
 * User schema
 * @type {module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}>}
 */
const User = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    workspaces: {
        type: Array,
        default: []
    },
}, {timestamps: true})

User.plugin(passportLocal)

module.exports = mongoose.model('User', User);