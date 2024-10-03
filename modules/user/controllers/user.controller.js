const { catchAsync } = require("../../../utils/catchAsync");
// const { userService, tokenService } = require("../services");
const { userService } = require("../../../allservice")
const httpStatus = require("http-status");



const handleRequest = (serviceFunction, reqQuery , reqFile, reqParam) => {
    console.log("ghghug")
    return catchAsync(async (req, res) => {
      let user = req.user? req.user : {}
      const requestField = reqQuery?req.query:reqFile?{file:req.file,body:req.body}:reqParam?req.params:req.body
      const result = await serviceFunction(requestField, user);
      res.status(httpStatus.OK).json({success: true,result});
    });
  };

  module.exports.addUser = handleRequest(userService.addUser);
  module.exports.editUser = handleRequest(userService.editUser);
 