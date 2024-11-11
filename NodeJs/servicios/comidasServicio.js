//se comunica con la BD que contiene los json
//Crea funciones que llaman al modelo Comida

const comida = require('../database/Comida');

const getAllComidas = () =>{
    const todasLasComidas = comida.getAllComidas();
    return todasLasComidas;
};

const getOneComida = () =>{
    return 
};

const createOneComida = () =>{
    return 
};

const updateOneComida = () =>{
    return 
};

const deleteOneComida = () =>{
    return 
};

module.exports = {
    getAllComidas,
    getOneComida,
    createOneComida,
    updateOneComida,
    deleteOneComida
};

