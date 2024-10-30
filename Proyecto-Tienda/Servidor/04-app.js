// Node.js tiene un módulo llamado fs (File System) que te permite trabajar con archivos.

const fs = require('fs');

fs.readFile('04-mensaje.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
});

fs.readFile('04-salida.txt', 'utf8', (err,data)=>{
    if (err) {
        console.error(err);
        return
    }
    console.log(data);
});