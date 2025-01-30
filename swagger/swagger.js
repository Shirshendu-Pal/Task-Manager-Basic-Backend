const express = require('express');
const router = express.Router();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

/* This is for Admin end Swagger API doc */
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
    tags: [],
    basePath: '/api',
    securityDefinitions: {
      Token: {
        type: 'apiKey',
        description: 'JWT authorization of an API',
        name: 'token',
        in: 'header',
      },
    },
  },
  apis: [path.join(__dirname, '../modules/**/routes/*.routes.js')],
};

// Set up Swagger dynamically based on the request's host
router.use((req, res, next) => {
  // Dynamically set the host based on the request's host (domain)
  const host = req.get('host'); // Gets the domain (e.g., xyz.com or abc.com)
  console.log("dynamic swagger host",host)
  optionsAdmin.swaggerDefinition.host = host; // Update the host in Swagger options

  if(host.includes("localhost")){
	optionsAdmin.swaggerDefinition.schemes = ["http"]
  }else{
	optionsAdmin.swaggerDefinition.schemes = ["https", "http"]
  }

  const swaggerSpec = swaggerJSDoc(optionsAdmin);
  require('swagger-model-validator')(swaggerSpec);

  // Serve the Swagger UI
  router.get('/apidoc-json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  router.use('/apidoc', swaggerUi.serveFiles(swaggerSpec), swaggerUi.setup(swaggerSpec));

  next(); // Continue with the request cycle
});

function validateModel(name, model) {
  const responseValidation = swaggerSpec.validateModel(name, model, false, true);
  if (!responseValidation.valid) {
    throw new Error('Model doesn\'t match Swagger contract');
  }
}

module.exports = {
  router,
  validateModel,
};