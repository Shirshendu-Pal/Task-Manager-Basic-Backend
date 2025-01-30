const Joi = require('joi');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../.env') });

const envVarsSchema = Joi.object().keys({ 
    SERVER_PORT: Joi.number().default(8080),
    MONGODB_URL: Joi.string().required(),
    SECRET_KEY: Joi.string().required(),

}).unknown()

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error)
    throw new Error(`Config validation error: ${error.message}`);

    module.exports = {
        serverPort: envVars.SERVER_PORT,

        mongoose: {
            url: envVars.MONGODB_URL,
            options: {
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            }
        },


    }