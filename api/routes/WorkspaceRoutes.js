var express = require('express');
const {userIsLoggedIn, userHasRightsOnWorkspaceMiddleware} = require("../middleware/user-middleware");
var router = express.Router();
const toJson = require('../utils/utils');
const workspaceModel = require('../models/WorkspaceModel');
const workspaceService = require("../services/WorkspaceService");
const {
    deleteWorskpaceById,
    addCollaborator,
    removeCollaborator,
    editDescription,
    setCollaborators
} = require("../services/WorkspaceService");
const userService = require('../services/UserService');
const taskService = require("../services/TaskService");
const taskModel = require("../models/TaskModel");

router.get('/', userIsLoggedIn(), async (req, res) => {
    return toJson(res, "", {"workspaces": await workspaceModel.find().exec()});
});

router.post('/new', userIsLoggedIn(), (req, res) => {
    let missingFields = [];
    ["name", "description"].forEach(field => {
        if (!req.body[field] || req.body[field] === "") {
            console.log("error");
            missingFields.push(field);
        }
    });
    if (missingFields.length !== 0)
        return toJson(res, "Invalid/Missing fields", {"fields": missingFields});
    let newWorkspace = workspaceService.createWorkspace(req.user, req.body.name, req.body.collaborators ? req.body.collaborators : [], req.body.description);
    if (!(newWorkspace instanceof workspaceModel))
        return toJson(res, newWorkspace);
    return toJson(res, "Workspace created successfully.", {"workspace": newWorkspace});
});

router.post('/:workspaceId/addCollaborator', userIsLoggedIn(), userHasRightsOnWorkspaceMiddleware(), async (req, res) => {
    if (!('collaboratorId' in req.body) || req.body.collaboratorId === "")
        return toJson(res, "Missing parameter", {"missingParameter": "collaboratorId"});
    let newCollaborator = await userService.getUserById(req.body.collaboratorId);
    if (newCollaborator === null)
        return toJson(res, "Couldn't find user", {"userId": req.body.collaboratorId});
    let result = await addCollaborator(req.user, res.locals.workspace, newCollaborator);
    if (!(result instanceof workspaceModel))
        return toJson(res, result);
    return toJson(res, "Collaborator added to the workspace with success!", {"workspace": result});
});


router.delete('/:workspaceId/removeCollaborator/:collaboratorId', userIsLoggedIn(), userHasRightsOnWorkspaceMiddleware(), async (req, res) => {
    let newCollaborator = await userService.getUserById(req.params.collaboratorId);
    if (newCollaborator === null)
        return toJson(res, "Couldn't find user", {"userId": req.body.collaboratorId});
    let result = await removeCollaborator(req.user, res.locals.workspace, newCollaborator);
    if (!(result instanceof workspaceModel))
        return toJson(res, result);
    return toJson(res, "Collaborator removed from workspace with success!", {"workspace": result});
});

router.post('/description/edit', userIsLoggedIn(), userHasRightsOnWorkspaceMiddleware(), async (req, res) => {
    if (!('description' in req.body) || req.body.description === "")
        return toJson(res, "Missing/wrong parameter", {"parameter": "description"});
    let result = editDescription(req.user, res.locals.workspace, req.body.description);
    return toJson(res, "Description edited with success!", {"workspace": result});
});

router.post('/:workspaceId/newTask', userIsLoggedIn(), userHasRightsOnWorkspaceMiddleware(), async (req, res) => {
    let missingFields = [];
    ["name", "description", "assignedTo", "completed", "priority"].forEach(field => {
        if (!(field in req.body))
            missingFields.push(field);
    });
    if (missingFields.length !== 0)
        return toJson(res, "Missing fields.", {"missingFields": missingFields});
    if (req.body.name === "")
        return toJson(res, "Name can't be empty.");
    let result = await taskService.createNewTask(req.user, req.body.name, req.body.description, req.body.assignedTo, req.body.completed, req.body.priority);
    if (result instanceof taskModel) {
        let workspace = await workspaceService.addTask(req.user, res.locals.workspace, result);
        if (workspace instanceof workspaceModel)
            return toJson(res, "Task added successfully!", {"workspace": workspace});
        return toJson(res, workspace);
    }
    return toJson(res, result);
});

router.delete('/:workspaceId/deleteTask/:taskId', userIsLoggedIn(), userHasRightsOnWorkspaceMiddleware(), async (req, res) => {
    let result = await workspaceService.removeTask(req.user, res.locals.workspace, req.params.taskId);
    if (result instanceof workspaceModel)
        return toJson(res, "Task removed with success", {"workspace": result});
    return toJson(res, result);
});

router.get('/:workspaceId/tasks', userIsLoggedIn(), userHasRightsOnWorkspaceMiddleware(), async (req, res) => {
    let result = await workspaceService.getTasks(req.user, req.params.workspaceId);
    return toJson(res, "", {"tasks": result});
});

router.post('');

router.delete('/:workspaceId', userIsLoggedIn(), userHasRightsOnWorkspaceMiddleware(), async (req, res) => {
    let result = await deleteWorskpaceById(req.params.workspaceId);
    if (result != null)
        return toJson(res, result);
    return toJson(res, "Workspace deleted with success");
});
module.exports = router;
