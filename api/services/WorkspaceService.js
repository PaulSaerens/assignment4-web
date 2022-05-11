let mongoose = require('mongoose');
let workspaceModel = require('../models/WorkspaceModel');
let taskModel = require('../models/TaskModel');
let userService = require('../services/UserService');
const toJson = require('../utils/utils');

function createWorkspace(user, workspaceName, collaborators, description) {
    try {
        collaborators.forEach(collaboratorId => {
            if (user.id === collaboratorId || userService.getUserById(collaboratorId) === null)
                return "Wrong collaborator.";
        });
        var newWorkspace = new workspaceModel({
            "name": workspaceName, "createdBy": user.id, "description": description, "collaborators": collaborators
        });
        newWorkspace.save();
        user.workspaces.push(newWorkspace.id);
        user.save();
        collaborators.forEach(async collaboratorId => {
            let collaborator = await userService.getUserById(collaboratorId);
            collaborator.workspaces.push(newWorkspace.id);
            collaborator.save();
        });
    } catch (e) {
        console.log(e.toString());
        return "Error during workspace creation.";
    }
    return newWorkspace;
}

async function deleteWorskpaceById(workspaceId) {
    let workspace = await workspaceModel.findById(workspaceId).exec();
    if (workspace == null) {
        return "Couldn't find workspace.";
    }
    let owner = await userService.getUserById(workspace.createdBy.toString());
    owner.workspaces.splice(owner.workspaces.indexOf(workspaceId));
    owner.save();
    for (const collaboratorId of workspace.collaborators) {
        let collaborator = await userService.getUserById(collaboratorId.toString());
        collaborator.workspaces.splice(collaborator.workspaces.indexOf(workspaceId));
        collaborator.save();
    }
    await workspace.remove();
    return null;
}

async function setCollaborators(user, workspace, collaboratorIds) {
    for (const collaboratorId of collaboratorIds) {
        let collaborator = await userService.getUserById(collaboratorId);
        if (!collaborator)
            return "Couldn't find user.";
    }
    let diff = workspace.collaborators.filter(x => !collaboratorIds.includes(x.toString()));
    workspace.collaborators = collaboratorIds;
    workspace.save();
    return workspace;
}

async function addCollaborator(user, workspace, newCollaborator) {
    if (workspace.collaborators.includes(newCollaborator.id.toString())) {
        console.log("ALREADY IN");
        return "Collaborator is already in workspace";
    } else {
        workspace.collaborators.push(newCollaborator.id);
        newCollaborator.workspaces.push(workspace.id);
        workspace.save();
        newCollaborator.save();
    }
    return workspace;
}

async function removeCollaborator(user, workspace, collaborator) {
    if (workspace.collaborators.includes(collaborator.id.toString())) {
        workspace.collaborators.splice(workspace.collaborators.indexOf(collaborator.id.toString()));
        workspace.save();
        let tasksAssignedToCollaborator = await tasksAssignedToUser(workspace, collaborator);
        tasksAssignedToCollaborator.forEach(task => {
            task.assignedTo.splice(task.assignedTo.indexOf(collaborator.id));
            task.save();
        });
        collaborator.workspaces.splice(collaborator.workspaces.indexOf(workspace.id.toString()));
        return workspace;
    } else {
        return "Collaborator is not in this workspace";
    }
}

async function tasksAssignedToUser(workspace, collaborator) {
    let tasksAssigned = taskModel.find({"workspace": workspace.id, assignedTo: collaborator.id}).exec();
    return tasksAssigned;
}

async function editDescription(user, workspace, newDescription) {
    workspace.description = newDescription;
    workspace.save();
    return workspace;
}

async function addTask(user, workspace, task) {
    if (workspace.tasks.includes(task.id))
        return "Task already in workspace";
    workspace.tasks.push(task.id);
    await workspace.save();
    task.workspace = workspace.id;
    await task.save();
    return workspace;
}

async function removeTask(user, workspace, taskId) {
    if (workspace.tasks.includes(taskId)) {
        workspace.tasks.splice(workspace.tasks.indexOf(taskId));
        await workspace.save();
        return workspace;
    }
    return "Task is not in this workspace";
}

async function getTasks(user, workspaceId) {
    let workspace = await workspaceModel.findById(workspaceId).exec();
    let tasks = [];
    for (const taskId of workspace.tasks) {
        tasks.push(await taskModel.findById(taskId).exec());
    }
    return tasks;
}


module.exports = {
    createWorkspace,
    deleteWorskpaceById,
    addCollaborator,
    removeCollaborator,
    setCollaborators,
    editDescription,
    addTask,
    removeTask,
    getTasks
};