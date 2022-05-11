var express = require('express');
var router = express.Router();
const User = require('../models/UserModel');
const passport = require('passport');
const toJson = require('../utils/utils');

router.get('/all', async (req, res) => {
    let users = await User.find().exec();
    return toJson(res, "", {"users": users});
});

router.get('/:userId', async (req, res) => {
    let user = await User.findById(req.params.userId).exec();
    if (!user)
        return toJson(res, "Couldn't find user.");
    return toJson(res, "", {"user": user});
});

router.post('/register', async (req, res) => {
    try {
        var newUser = await User.register({
            username: req.body.username,
            password: req.body.password
        }, req.body.password);
    } catch (e) {
        return toJson(res, "User already exists.", {});
    }
    return toJson(res, "User created with success", {"user": {"id": newUser.id, "username": newUser.username}});
});

router.post('/login', passport.authenticate('local', {
    failureMessage: true
}), (req, res) => {
    return toJson(res, "Successfully logged in", {"user": {"username": req.user.username, "id": req.user.id}});
});

router.post('/logout', (req, res) => {
    req.logout();
    return toJson(res, "Logged out successfully.");
});

module.exports = router;
