var express = require('express');
var router = express.Router();
let taskService = require('../services/TaskService');
let taskModel = require('../models/TaskModel');
let toJson = require('../utils/utils');
const {userIsLoggedIn, userHasRightsOnWorkspaceMiddleware} = require('../middleware/user-middleware');

router.delete('/:taskId/delete', userIsLoggedIn(), async (req, res) => {
    await taskService.deleteTaskById(req.user, req.params.taskId);
    return toJson(res, "Task deleted with success.");
});

router.post('/:taskId/assignUser', userIsLoggedIn(), async (req, res) => {
    if (!req.body.assignTo || req.body.assignTo === "")
        return toJson(res, "Invalid parameter");
    let result = await taskService.assignUserToTask(req.user, req.params.taskId, req.body.assignTo);
    if (result instanceof taskModel)
        return toJson(res, "User assigned with success!", {"task": result});
    return toJson(res, result);
});

router.delete('/:taskId/removeUser', userIsLoggedIn(), async (req, res) => {
    if (!req.body.collaboratorId || req.body.collaboratorId === "")
        return toJson(res, "Invalid parameter");
    let result = await taskService.removeUserFromTask(req.user, req.params.taskId, req.body.collaboratorId);
    if (result instanceof taskModel)
        return toJson(res, "User removed from task with success", {"task": result});
    return toJson(res, result);
});

router.post('/:taskId/complete', userIsLoggedIn(), async (req, res) => {
    let result = await taskService.completeTask(req.user, req.params.taskId);
    return toJson(res, "Task marked as completed.", {"task": result});
});

router.get('/:taskId', userIsLoggedIn(), async (req, res) => {
    let result = await taskService.getTask(req.user, req.params.taskId);
    if (result instanceof taskModel)
        return toJson(res, "", {"task": result});
    return toJson(res, result);
});

router.post('/:taskId/setPriority', async (res, req) => {
    let result = await taskService.setPriority(req.user, req.params.taskId, req.params.priority);
    if (result instanceof taskModel)
        return toJson(res, "", {"task": result});
    return toJson(res, result);
});

module.exports = router;
