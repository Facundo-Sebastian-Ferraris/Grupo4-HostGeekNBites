//El controlador se comunica con el Servicio
//Este usa la lógica del express para el send, etc

//importamos el servicio
const comidasServicio = require('../servicios/comidasServicio');

const getAllComidas = (req, res) =>{

    const todasLasComidas = comidasServicio.getAllComidas();
    //en el send deberiamos mandar un json con el resultado
    res.send({status: "OK", data: todasLasComidas});
};

const getOneComida = (req, res) =>{
    const unaComida = comidasServicio.getOneComida();
    //en el send deberiamos mandar un json con el resultado
    res.send(`Obtener comida ${req.params.idcomida}`);
};

const createOneComida = (req, res) =>{
    const comidaCreada = comidasServicio.createOneComida();
    //en el send deberiamos mandar un json con el resultado
    res.send(`Creamos una comida ${req.params.nombrecomida}`);
};

const updateOneComida = (req, res) =>{
    const comidaActualizada = comidasServicio.updateOneComida();
    //en el send deberiamos mandar un json con el resultado
    res.send(`Actualizar comida ${req.params.idcomida}`);
};

const deleteOneComida = (req, res) =>{
    comidasServicio.deleteOneComida();
    //en el send deberiamos mandar un json con el resultado
    res.send(`Borrar comida ${req.params.idcomida}`);
};

module.exports = {
    getAllComidas,
    getOneComida,
    createOneComida,
    updateOneComida,
    deleteOneComida
};