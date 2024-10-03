const Joi = require("joi");

module.exports.addUser = {
    body: Joi.object().keys({
        name: Joi.string().required()  
    }),
};
module.exports.editUser = {
    body: Joi.object().keys({
        name: Joi.string().required()  
    }),
};