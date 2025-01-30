const express = require('express');

const router = express.Router();

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const path = require('path');

/* This is for Admin end swiagger API doc */
const optionsAdmin = {
	swaggerDefinition: {
		info: {
			title: "basic-structure",
			version: '1.0.0',
			description: "basic-structure" + ' API Documentation',
			contact: {
				email: '',
			},
		},
		tags: [
			
		],
		schemes: ['http'],
		host: 'localhost:8001',
		// schemes: ['https','http',],
		// host: "sentdrop.dedicateddevelopers.us",
		basePath: '/',
		securityDefinitions: {
			Token: {
				type: 'apiKey',
				description: 'JWT authorization of an API',
				// name: 'x-access-token',
                name:"name",
				in: 'header',
			},
		},
	},

	apis: [path.join(__dirname, '../modules/**/routes/*.routes.js')],
};



const swaggerSpec = swaggerJSDoc(optionsAdmin);
require('swagger-model-validator')(swaggerSpec);

router.get('/apidoc-json', (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	res.send(swaggerSpec);
});

router.use('/apidoc', swaggerUi.serveFiles(swaggerSpec), swaggerUi.setup(swaggerSpec));


function validateModel(name, model) {
	const responseValidation = swaggerSpec.validateModel(name, model, false, true);
	if (!responseValidation.valid) {
		throw new Error('Model doesn\'t match Swagger contract');
	}
}





module.exports = {
	router,
	validateModel
};
