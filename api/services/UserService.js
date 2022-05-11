const userModel = require('../models/UserModel');

async function getUserById(userId) {
    return await userModel.findById(userId).exec();
}

module.exports = {getUserById};