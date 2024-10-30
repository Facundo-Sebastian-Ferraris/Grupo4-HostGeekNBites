//introduccion a conceptos basicos de node.js

//el require funciona como un import
const http = require('http');

var texto = 'Hola este es mi primer codigo con node.js';

//creamos el server
const server = http.createServer((req,res)=>{
    res.statusCode = 200; //codigo 2xx es de exito
    res.setHeader('Content-Type', 'text/plain'); //seteamos el encabezado diciendo que lo que recibe es un texto plano
    res.end('hola mundo!\n'); //cerramos el response y de paso ponemos un texto;
});


//que el servidor "escuche" por el puerto 3000 (debe ser superior a 1024)
const puerto = 3000; //3000 es muy tradicional para novatos en node.js :)
const link = 'http://localhost:'+puerto;

server.listen(puerto, ()=>{
    console.log('servidor abierto ' + link); // para abrir el link manten presionado control y clickea el link
});

//ejecutas el codigo con el comando: node 01-app.js