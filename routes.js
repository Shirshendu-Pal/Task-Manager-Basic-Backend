const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Define the base directory where your modules are located
const modulesDir = path.join(__dirname, 'modules');

// Function to recursively go through module folders and register routes
fs.readdirSync(modulesDir).forEach(moduleFolder => {
    const modulePath = path.join(modulesDir, moduleFolder);

    if (fs.statSync(modulePath).isDirectory()) {
        const routesDir = path.join(modulePath, 'routes'); // Adjust to look into the 'routes' folder

        if (fs.existsSync(routesDir) && fs.statSync(routesDir).isDirectory()) {
            // Read all the route files in the routes folder
            fs.readdirSync(routesDir).forEach(file => {
                if (file.endsWith('.routes.js')) {
                    const route = require(path.join(routesDir, file));
                    const routeName = file.split('.routes.js')[0]; // Derive route path from file name
                    const routePath = `/${routeName}`; // Create path like /user, /userAuth, etc.
                    router.use(routePath, route);
                }
            });
        }
    }
});

module.exports = router;
