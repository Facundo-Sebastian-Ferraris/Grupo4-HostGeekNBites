//se comunica con la BD que contiene los json
//Crea funciones que llaman al modelo Comida

const comic = require('../database/Comic');

const getAllComics = () =>{
    const todosLosComics = comic.getAllComics();
    return todosLosComics;
};

const getComicsPages = (inicio, fin) =>{
    const losComics = comic.getComicsPages(inicio, fin);
    return losComics;
};

const getOneComic = (id) =>{
    const unComic = comic.getOneComic(id);
    return unComic;
};

const createOneComic = (body) =>{
    const unComic = comic.createOneComic(body);
    return unComic;
};

const updateOneComic = (id, body) =>{
    const elComic = comic.updateOneComic(id,body);
    return elComic;
};

const deleteOneComic = (id) =>{
    const unComic = comic.deleteOneComic(id);
    return unComic; 
};

//exporta para que el controlador que los requiera pueda usarlos
module.exports = {
    getAllComics,
    getComicsPages,
    getOneComic,
    createOneComic,
    updateOneComic,
    deleteOneComic
};