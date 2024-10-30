// Una promesa en JavaScript es un objeto que representa el resultado eventual (o la falla) 
//de una operación asíncrona. Es como un acuerdo: "Te prometo que te daré el resultado en algún momento". 
//La promesa puede estar en tres estados diferentes:

// Pendiente (pending): Es el estado inicial, cuando la operación asíncrona todavía no ha terminado.
// Resuelta o Cumplida (fulfilled): La operación se completó exitosamente y se obtuvo el resultado.
// Rechazada (rejected): Hubo un error o fallo en la operación y se obtuvo una razón del fallo.

//EJEMPLO:
// Imagina que pides una pizza por teléfono:

// Estado pendiente: Estás esperando a que te entreguen la pizza.
// Estado resuelto: Recibes la pizza.
// Estado rechazado: No te entregan la pizza debido a un problema (tal vez se quedaron sin ingredientes o se retrasaron).

//importamos el modulo como promesa
const fs = require('fs/promises'); 

//direccion del txt
const direccionArchivo = '01-archivo.txt'; 

//creamos una funcion asincronica *concepto asincrono al final de este .js
async function manejarArchivos() {
    try {
        // el await sirve para indicar que la operacion debe detenerse hasta que la intruccion señalada
        // con await, termine de realizarse.

        // no se ejecutara console.log('Contenido del archivo:', data); hasta que la promesa
        //fs.readFile(direccionArchivo, 'utf8'); se termine de ejecutar
        let data = await fs.readFile(direccionArchivo, 'utf8');
        console.log('Contenido del archivo:', data);

        await fs.appendFile(direccionArchivo, '\nNuevo contenido agregado.');
        console.log('Contenido agregado.');
    } catch (error) {
        console.error('Error manejando el archivo:', error);
    }
}

manejarArchivos();

//asincrono: es la capacidad de realizar tareas sin bloquear el flujo del programa.
// mientras se realiza esa operacion asincrona, puede seguir ejecutando otras operaciones.
//  Metaforicamente:
// Mi mama es asincrona porque cuando cocina los fideos, va preparando la salsa, la ensalada, etc (no se queda viendo como se cocinan los fideos).
// Mi papa no es asincrono porque cuando hace el asado, se queda con los amigos mirando el fuego.