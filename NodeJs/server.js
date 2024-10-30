const express = require('express');
const app = express();
const ip = '172.16.100.172';
const puerto = '3030';

const path = require('path');
const fs = require('fs');

// Define the path to the static files
const staticPath = path.join(__dirname, '../Proyecto-Tienda');
console.log('Static path:', staticPath);

// Check if the directory exists
if (!fs.existsSync(staticPath)) {
    console.error('Directory does not exist:', staticPath);
    process.exit(1);
}

// Check if index.html exists
const indexPath = path.join(staticPath, '/HTML/index.html');
if (!fs.existsSync(indexPath)) {
    console.error('index.html does not exist:', indexPath);
    process.exit(1);
}

// Serve static files from the Proyecto-Tienda directory
app.use(express.static(staticPath));

// Serve index.html for the root URL
app.get('/', (req, res) => {
    res.sendFile(indexPath);
});

// Start the server
app.listen(puerto, () => {
    console.log('Server is running at http://' + ip + ':' + puerto);
});
