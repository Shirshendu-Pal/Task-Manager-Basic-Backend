const fs = require('fs');
const path = require('path');

// Define the base directory where your modules are located
const modulesDir = path.join(__dirname, 'modules');

// Object to store all services dynamically
const services = {};

// Function to recursively go through module folders and load services
fs.readdirSync(modulesDir).forEach(moduleFolder => {
    const modulePath = path.join(modulesDir, moduleFolder);

    // Ensure we're reading directories only
    if (fs.statSync(modulePath).isDirectory()) {
        const servicesDir = path.join(modulePath, 'services'); // Path to the 'services' folder

        // Check if the 'services' folder exists and is a directory
        if (fs.existsSync(servicesDir) && fs.statSync(servicesDir).isDirectory()) {
            // Read all files in the services folder
            fs.readdirSync(servicesDir).forEach(file => {
                if (file.endsWith('.service.js')) {
                    const serviceName = file.split('.service.js')[0]; // Extract service name
                    // Create the service name in the format: userService, userAuthService, etc.
                    const formattedServiceName = serviceName.charAt(0).toLowerCase() + serviceName.slice(1) + 'Service';
                    // Require and assign the service to the services object
                    services[formattedServiceName] = require(path.join(servicesDir, file));
                }
            });
        }
    }
});

// Export the loaded services
module.exports = services;
