
const httpStatus = require('http-status');
const ApiError = require("../utils/ApiError");
const User  = require("../modules/user/models/user.model");

module.exports.authorize = async (req, res, next) => {
    try {
        // Check if the token (name in this case) is present in the request headers
        if (!req.headers.name) {
            return next(new ApiError(httpStatus.BAD_REQUEST, "Token missing"));
        }

        // Find the user based on the provided token/name
        const user = await User.findOne({ name: req.headers.name });
        if (!user) {
            return next(new ApiError(httpStatus.BAD_REQUEST, "User not found"));
        }

        // Attach user info to the request object for use in the next middleware or route handler
        req.user = user;
        next(); // Proceed to the next middleware
    } catch (error) {
        // Pass any unexpected errors to the error handling middleware
        next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Internal server error"));
    }
};
