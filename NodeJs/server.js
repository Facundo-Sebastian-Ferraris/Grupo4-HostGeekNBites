const express = require('express');
const app = express();
const ip = '172.16.100.172';
const puerto = '3030';

const path = require('path');

// Define the path to the static files
const staticPath = path.join(__dirname, '../../Proyecto-Tienda');
console.log('Static path:', staticPath);

// Serve static files from the Proyecto-Tienda directory
app.use(express.static(staticPath));

// Start the server
app.listen(puerto, () => {
    console.log('Server is running at http://' + ip + ':' + puerto);
});
