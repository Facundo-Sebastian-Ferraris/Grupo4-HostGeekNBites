//Clase Comida
//Se comunica directamente con la BD

const DB = require('./comidas.json');

const getAllComidas = () =>{
    return DB.comidas;
}

module.exports = {
    getAllComidas
};