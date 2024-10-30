// Node.js está basado en módulos. Puedes importar módulos predefinidos o instalar los tuyos usando NPM (Node Package Manager).
// Vamos a usar el módulo os de Node.js, que permite obtener información sobre el sistema operativo.
const os = require('os');

console.log('Información del sistema:');
console.log(`Sistema operativo: ${os.platform()}`);
console.log(`Arquitectura: ${os.arch()}`);
console.log(`Memoria libre: ${os.freemem()} bytes`);
console.log(`Total de memoria: ${os.totalmem()} bytes\n\n\n`);
console.log('doxeado papaaa! B)');

//EN LA TERMINAL EJECUTA: npm init -y
//se creara un package.json para inicializar un nuevo proyecto ^.^
//tambien ejecuta en terminal: npm install chalk
// esto sirve para colorear texto wuu