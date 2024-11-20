//El controlador se comunica con el Servicio
//Este usa la logica del express para el send, etc

//importamos el servicio
const comicsServicio = require('../servicios/comicsServicio');


const getAllComics = (req, res) => {
    const salto = req.query.salto;  // Esto accederá al parámetro 'salto'
    const limite = req.query.limite;  // Esto accederá al parámetro 'limite'
    if(salto && limite){
        const losComics = comicsServicio.getComicsPages(salto, limite);
        res.status(200).send({status: "OK", data: losComics});
    }else{
        const todosLosComics = comicsServicio.getAllComics();
        res.status(200).send({status: "OK", data: todosLosComics});
    }
};

const getComicsPages = (req, res) => {
    const salto = req.query.salto;  // Esto accederá al parámetro 'salto'
    const limite = req.query.limite;  // Esto accederá al parámetro 'limite'
    console.long("params");
    console.long(req.searchParams);
    console.long(salto);
    console.long(limite);
    const losComics = comicsServicio.getComicsPages(salto, limite);
    res.status(200).send({status: "OK", data: losComics});
};

const getOneComic = (req, res) => {
    const comic_id = parseInt(req.params.id); //obtiene el id desde los parametros
    const unComic = comicsServicio.getOneComic(comic_id);
    if(!unComic){
        res.status(404).send({status: "Comic no encontrado"})
    }else{
        res.status(200).send({status: "OK", data: unComic});
    }
};

const createOneComic = (req,res) => {
    const body = req.body; //obtiene el cuerpo de la solicitud
    const comicCreado = comicsServicio.createOneComic(body);
    if(!comicCreado){
        res.status(404).send({status: "Error"})
    }else{
        res.status(200).send({status: "OK", data: comicCreado});
    }
};

const updateOneComic = (req,res) => {
    const comic_id = parseInt(req.params.id); //obtiene el id desde los parametros
    const body = req.body; //obtiene el cuerpo de la solicitud
    const comicActualizado = comicsServicio.updateOneComic(comic_id,body);
    if(comicActualizado === 0){
        res.status(404).send({status: "Error"})
    }else{
        res.status(200).send({status: "Comic actualizado"});
    }
};

const deleteOneComic = (req,res) => {
    const comic_id = parseInt(req.params.id); //obtiene el id desde los parametros
    const comicEliminado = comicsServicio.deleteOneComic(comic_id);
    if(comicEliminado === 1){
        res.status(200).send({status: "Comic eliminado"});
    }else{
        res.status(404).send({status: "Error"});
    }
};

//exportamos para que el router pueda acceder a los mismos segun el metodo lanzado como solicitud
module.exports = {
    getAllComics,
    getComicsPages,
    getOneComic,
    createOneComic,
    updateOneComic,
    deleteOneComic
};