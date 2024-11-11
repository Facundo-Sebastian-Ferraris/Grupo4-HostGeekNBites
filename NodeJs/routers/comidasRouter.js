const express = require("express");

const routerComidas = express.Router();

//importamos el controlador
const comidasController = require('../controllers/comidasController');

routerComidas
    .get("/", comidasController.getAllComidas)

    .get("/:idcomida", comidasController.getOneComida)

    .post("/:nombrecomida", comidasController.createOneComida)

    .put("/:idcomida", comidasController.updateOneComida)

    .delete("/:idcomida", comidasController.deleteOneComida);

module.exports = routerComidas;