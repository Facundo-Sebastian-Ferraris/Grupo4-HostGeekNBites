// similar al 01-app.js
const http = require('http');

var texto = 'Hola este es mi primer codigo con node.js';


// creamos server

const server = http.createServer((req,res)=>{
    //el req.url retorna en que seccion estamos parados (es luego del localhost:3000), puede ser / si estamos en la nada, como /algo


    if (req.url === '/') {//si estamos en la nada
        res.statusCode = 200;
        res.end('pagina de inicio\n');

    } else if (req.url === '/about') {//si estamos en about
        res.statusCode = 200;
        res.end('pagina de informacion\n');

    }else if (req.url === '/contactos') {
        res.statusCode = 200;
        res.end('llamame ;3 \n');

    } 
    else {//si estamos en cualquier shet
        res.statusCode = 404;
        res.end('pagina no encontrada\n');
    }
});
//observacion, siempre damos un codigo de estado por cuestiones protocolares
//2xx es para exito
//4xx es para fracaso (lo que no sos bb ;) segui asi!)

//que el servidor "escuche" por el puerto 3000 (debe ser superior a 1024)
const puerto = 3000; //3000 es muy tradicional para novatos en node.js :)
const link = 'http://localhost:'+puerto;
const about = link + '/about';
const contacto = link + '/contactos';
const cualquiera = link + '/jeje';

server.listen(puerto, ()=>{
    console.log('servidor abierto\n' + link + '\n' + about + '\n' + cualquiera+ '\n' + contacto);
});