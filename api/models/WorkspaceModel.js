const mongoose = require('mongoose')

/**
 * Workspace schema
 * @type {module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}>}
 */
const Workspace = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    collaborators: {
        type: Array,
        default: []
    },
    tasks: {
        type: Array,
        default: []
    }
}, {timestamps: true})


module.exports = mongoose.model('Workspace', Workspace);