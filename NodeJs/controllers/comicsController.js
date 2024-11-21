//El controlador se comunica con el Servicio
//Este usa la logica del express para el send, etc

//importamos el servicio
const comicsServicio = require("../servicios/comicsServicio");

const getAllComics = (req, res) => {
  const salto = req.query.salto; // Esto accederá al parámetro 'salto'
  const limite = req.query.limite; // Esto accederá al parámetro 'limite'
  if (salto && limite) {
    const losComics = comicsServicio.getComicsPages(salto, limite);
    if(!losComics){
        res.status(404).send({status: "Paginacion incorrecta"});
    }else{
        res.status(200).send({ status: "OK", data: losComics });
    }
  } else {
    const todosLosComics = comicsServicio.getAllComics();
    res.status(200).send({ status: "OK", data: todosLosComics });
  }
};

const getOneComic = (req, res) => {
  const comic_id = parseInt(req.params.id); //obtiene el id desde los parametros
  const unComic = comicsServicio.getOneComic(comic_id);
  if (!unComic) {
    res.status(404).send({ status: "Comic no encontrado" });
  } else {
    res.status(200).send({ status: "OK", data: unComic });
  }
};
// función para validar todos los datos del cómics
function validarComic(comic) {
  // verifica que el nombre esté presente y sea un string
  if (!comic.nombre || typeof comic.nombre !== "string") {
    return "El campo 'nombre' es requerido y debe ser un string.";
  }
  // Verifica que el año esté presente y sea un número
  if (!comic.añoDePublicacion || typeof comic.añoDePublicacion !== "number") {
    return "El campo 'anoPublicacion' es requerido y debe ser un número.";
  }
  return null;
}

const createOneComic = (req, res) => {
  const body = req.body; //obtiene el cuerpo de la solicitud
  //se validan los datos de entrada
  const error = validarComic(body);
  if (error) {
    return res.status(400).json({ error });
  }
  const comicCreado = comicsServicio.createOneComic(body);
  if (!comicCreado) {
    res.status(404).send({ status: "Error" });
  } else {
    res.status(200).send({ status: "OK", data: comicCreado });
  }
};
// función para validar uno o los datos del comic
function validarComicParcial(comic) {
  // si el nombre está presente, verifica que sea un string
  if (comic.nombre && typeof comic.nombre !== "string") {
    return "El campo 'nombre' debe ser un string.";
  }
  // si el año de publicación está presente, verifica que sea un número
  if (comic.añoDePublicacion && typeof comic.añoDePublicacion !== "number") {
    return "El campo 'añoDePublicacion' debe ser un número.";
  }
  return null;
}

const updateOneComic = (req, res) => {
  const comic_id = parseInt(req.params.id); //obtiene el id desde los parametros
  const body = req.body; //obtiene el cuerpo de la solicitud
  // se validan los datos de entrada
  const error = validarComicParcial(body);
  if (error) {
    return res.status(400).json({ error });
  }
  const comicActualizado = comicsServicio.updateOneComic(comic_id, body);

  if (comicActualizado === 0) {
    res.status(404).send({ status: "Error" });
  } else {
    res.status(200).send({ status: "Comic actualizado" });
  }
};

const deleteOneComic = (req, res) => {
  const comic_id = parseInt(req.params.id); //obtiene el id desde los parametros
  const comicEliminado = comicsServicio.deleteOneComic(comic_id);
  if (comicEliminado === 1) {
    res.status(200).send({ status: "Comic eliminado" });
  } else {
    res.status(404).send({ status: "Error" });
  }
};

const buscarComics = (req, res) => {
  const inicio = parseInt(req.params.inicio);
  const cantidad = parseInt(req.params.cantidad);

  if (isNaN(inicio) || isNaN(cantidad) || inicio < 0 || cantidad <= 0) {
    return res.status(400).json({ error: "Parámetros inválidos" });
  }

  const comicsSeleccionados = comicsServicio.obtenerComics(inicio, cantidad);
  res.json({ comics: comicsSeleccionados });
};

//exportamos para que el router pueda acceder a los mismos segun el metodo lanzado como solicitud
module.exports = {
  getAllComics,
  getComicsPages,
  getOneComic,
  createOneComic,
  updateOneComic,
  deleteOneComic,
  buscarComics,
};
