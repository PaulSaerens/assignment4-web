const workspaceModel = require("../models/WorkspaceModel");
const userModel = require("../models/UserModel");
const toJson = require('../utils/utils');

function userIsLoggedIn(req, res, next) {
    return (req, res, next) => {
        if (req.isAuthenticated()) {
            next();
        } else {
            return toJson(res, "You must be logged in to access this ressource", {}, 401);
        }
    };
}

function userHasRightsOnWorkspaceMiddleware(req, res, next) {
    return async (req, res, next) => {
        let user = req.user;
        if (!user)
            return "User not found";
        let workspaceId = req.params.workspaceId;
        if (!workspaceId)
            return toJson(res, "Missing parameter", {"missingParameter": workspaceId});
        let workspace = await workspaceModel.findById(workspaceId).exec();
        if (!workspace)
            return toJson(res, "Workspace not found");
        console.log(workspace.createdBy.toString(), user.id.toString());
        if (workspace.createdBy.toString() !== user.id.toString() && !(workspace.collaborators.includes(user.id.toString())))
            return toJson(res, "You don't have the permissions to do that.");
        else {
            res.locals.workspace = workspace;
            return next();
        }
    };
}

module.exports = {userIsLoggedIn, userHasRightsOnWorkspaceMiddleware};