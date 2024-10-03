const User = require("../models/user.model")
const httpStatus = require("http-status");
const ApiError = require("../../../utils/ApiError");

const addUser = async(reqBody) =>{

 const user = await User.create(reqBody)
 return user

}
const editUser = async(reqBody, user) =>{
    console.log(user)
    const userDoc = await User.findByIdAndUpdate(user._id, reqBody, {new: true})
    return userDoc
   
}

module.exports={
    addUser,
    editUser
}