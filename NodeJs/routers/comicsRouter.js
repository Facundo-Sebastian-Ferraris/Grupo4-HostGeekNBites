const express = require('express'); //importamos express

const routerComics = express.Router(); //creamos el router

const comicsController = require('../controllers/comicsController'); //importamos el controlador para hacer uso de sus metodos

//Definimos los distintos metodos HTTP
routerComics
    .get("/", comicsController.getAllComics)//se obtienen todos los comics

    .get("/:id", comicsController.getOneComic)//se obtiene un comic particular

    .post("/", comicsController.createOneComic) //crea un comic

    .put("/:id", comicsController.updateOneComic) //actualiza un comic

    .delete("/:id", comicsController.deleteOneComic) //eliminaria un comic

    .get("/del/:id", comicsController.deleteOneComic) //elimina un comic (para prueba desde la pagina)

module.exports = routerComics; //exportamos el router para que el server pueda accederlo para redirigir segun rutas