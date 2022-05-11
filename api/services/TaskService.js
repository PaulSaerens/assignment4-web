const taskModel = require('../models/TaskModel');
const {getUserById} = require('../services/UserService');

async function getTask(user, taskId) {
    try {
        return await taskModel.findById(taskId).exec();
    } catch (e) {
        return "Invalid ID";
    }
}

async function createNewTask(user, name, description = "", assignedTo = null, completed = false, priority) {
    if (!name || name === "")
        return "Wrong parameters";
    let assignedToUser = getUserById(assignedTo);
    if (!assignedToUser)
        return "User not found.";
    let newTask = new taskModel({
        "name": name,
        "description": description,
        "assignedTo": assignedTo,
        "completed": completed,
        "createdBy": user.id,
        "priority": priority
    });
    await newTask.save();
    return newTask;
}

async function deleteTaskById(user, taskId) {
    await taskModel.findByIdAndDelete(taskId).exec();
}

async function assignUserToTask(user, taskId, assignToId) {
    let assignTo = await getUserById(assignToId);
    if (!assignTo)
        return "User not found";
    let task = await taskModel.findById(taskId).exec();
    console.log(assignTo.id, task.assignedTo);
    if (task.assignedTo.includes(assignToId))
        return "User is already assigned to task.";
    task.assignedTo.push(assignTo.id);
    await task.save();
    return task;
}

async function removeUserFromTask(user, taskId, assignedToId) {
    let task = await taskModel.findById(taskId).exec();
    if (!(assignToId in task.assignedTo))
        return "User is not assigned to task.";
    if (!await getUserById(assignToId))
        return "User not found";
    task.assignedTo.splice(task.assignedTo.indexOf(assignToId));
    await task.save();
    return task;
}

async function completeTask(user, taskId) {
    let task = await taskModel.findById(taskId);
    task.completed = !task.completed;
    task.save();
    return task;
}

async function setPriority(user, taskId, priority) {
    let task = await taskModel.findById(taskId);
    if (!task)
        return "Task not found";
    task.priority = priority;
    task.save();
    return task;
}

module.exports = {
    createNewTask, deleteTaskById, assignUserToTask, removeUserFromTask, completeTask, getTask, setPriority
};
