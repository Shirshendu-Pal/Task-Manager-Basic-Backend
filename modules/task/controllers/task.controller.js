const { catchAsync } = require("../../../utils/catchAsync");
// const { authService, tokenService } = require("../services");
// const { authService ,  } = require("../../../allservice")
const httpStatus = require("http-status");
const taskService = require("../services/task.service")



const handleRequest = (serviceFunction, reqQuery , reqFile, reqParam) => {
    return catchAsync(async (req, res) => {
      const params = req.params?req.params : {}
      const requestField = reqQuery?req.query:reqFile?{file:req.file,body:req.body}:reqParam?req.params:req.body
      const result = await serviceFunction(requestField, params);
      res.status(httpStatus.OK).json({success: true,result});
    });
  };

module.exports.addTask = handleRequest(taskService.addTask);
module.exports.getTasks = handleRequest(taskService.getTasks, true);
module.exports.editTask = handleRequest(taskService.editTask, false , false, true);
module.exports.deleteTask = handleRequest(taskService.deleteTask, false, false,true);