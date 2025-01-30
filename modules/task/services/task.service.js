const jwt = require("jsonwebtoken");
const config = require("../../../configuration/config");
const moment = require("moment");
// const { taskTypes } = require("../../../configuration/constant");
const otpGenerator = require("otp-generator");
const httpStatus = require("http-status");
const ApiError = require("../../../utils/ApiError");
const Task = require("../models/task.model")
// const TaskSetting = require("../models/taskSettings.model")
const mongoose = require("mongoose")

const addTask = async (reqBody) =>{
    const task = await Task.create(reqBody)
    return task
}
const getTasks = async (reqQuery) =>{
    for(let [key, value] of Object.entries(reqQuery)){
        if(value === "") delete reqQuery[key]
        if(value === "true") reqQuery[key] = true
        if(value === "false") reqQuery[key] = false
    }
    reqQuery["isDeleted"] = false
    let page = reqQuery.page
    let limit = reqQuery.limit
    delete reqQuery.page
    delete reqQuery.limit
    const aggregate = Task.aggregate([
        {
            $match: reqQuery
        }
    ])
    const options = { page, limit };

    // Execute aggregation with pagination using aggregatePaginate
    const tasks = await Task.aggregatePaginate(
      aggregate,
      options
    );

    return tasks
}
const editTask = async (reqParams) =>{
    const task = await Task.findOneAndUpdate(
        { id: reqParams.id },
        [{ $set: { status: { $not: "$status" } } }], // Aggregation pipeline method
        { new: true }
      );
    return task
}

const deleteTask = async (reqParams) =>{
    await Task.findOneAndUpdate({id: reqParams.id}, {isDeleted: true})
    return true
}



module.exports={
    addTask,
    editTask,
    getTasks,
    deleteTask
}