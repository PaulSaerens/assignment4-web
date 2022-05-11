const mongoose = require('mongoose');
const {mongo} = require("mongoose");

/**
 * Task schema
 * @type {module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}>}
 */
const Task = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        default: ""
    },
    assignedTo: {
        type: Array,
        default: null,
        required: false
    },
    priority: {
        type: String,
        enum: ["LOW", "MEDIUM", "HIGH"],
        default: "MEDIUM"
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    },
    workspace: {
        type: mongoose.Schema.Types.ObjectId,
        default: undefined
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {timestamps: true});


module.exports = mongoose.model('Task', Task);