//Clase Comic
//Se comunica directamente con la BD
const fs = require("fs");

const getAllComics = () => {
  const file = readData();
  const datos = file.comics;
  return datos;
};

const getComicsPages = (inicio, fin) => {
  const file = readData();
  const datos = file.comics;
  const resul = datos.slice(inicio, inicio + fin);
  return resul;
};

const getOneComic = (id) => {
  const file = readData();
  const datos = file.comics;
  const comic = datos.find((comic) => comic.id === id);
  return comic;
};

const obtenerComics = (inicio, cantidad) => {
  const file = readData();
  const comics = file.comics;

  // valida que los parámetros no excedan la longitud del arreglo
  if (inicio >= comics.length || cantidad <= 0 || inicio < 0) {
    return [];
  }

  const comicsSeleccionados = comics.slice(inicio, inicio + cantidad);
  return comicsSeleccionados;
};

const createOneComic = (body) => {
  const file = readData();
  const nuevoComic = {
    id: file.comics.length + 1,
    ...body,
  };
  file.comics.push(nuevoComic);
  console.log("la base tiene:");
  console.log(file);
  escribirDatos(file);
  return nuevoComic;
};

const deleteOneComic = (id) => {
  const file = readData();
  const datos = file.comics;
  const comic = datos.find((comic) => comic.id === id);
  const pos = file.comics.indexOf(comic);
  var valor = 0;
  if (pos >= 0) {
    file.comics.splice(pos, 1);
    escribirDatos(file);
    valor = 1;
  }
  return valor;
};
// función para validar uno o los datos del comic
function validarComicParcial(comic) {
  // si el nombre esta presente verifica que sea un string

  if (comic.nombre && typeof comic.nombre !== "string") {
    return "El campo 'nombre' debe ser un string.";
  }
  // si el año esta presente verifica que sea un número
  if (comic.añoPublicacion && typeof comic.añoDePublicacion !== "number") {
    return "El campo 'añoDePublicacion' debe ser un número.";
  }
  return null;
}

const updateOneComic = (id, body) => {
  const file = readData();
  const datos = file.comics;
  const pos = datos.findIndex((comic) => comic.id === id); //obtenemos el comic que queremos actualizar
  //const comic = datos.find(comic => comic.id === id);
  //const pos = file.comics.indexOf(comic);
  // se validan los datos de entrada
  const error = validarComicParcial(body);
  if (error) {
    return res.status(400).json({ error });
  }
  var logrado = 0;
  if (pos > -1) {
    //si se encontro hacemos la actualizacion
    //actualiza el comic con los datos proporcionados
    file.comics[pos] = {
      ...file.comics[pos],
      ...body,
    };

    escribirDatos(file);
    logrado = 1;
  }
  return logrado;
};

const escribirDatos = (data) => {
  try {
    fs.writeFileSync("./database/comics.json", JSON.stringify(data)); // convierte el objeto data a JSON y lo escribe en el arcihvo json
  } catch (error) {
    console.log(error);
  }
};

const readData = () => {
  try {
    const data = fs.readFileSync("./database/comics.json"); //lee el archivo y lo almacena en data
    return JSON.parse(data); // parsea y retorna los datos como un objeto JavaScript
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllComics,
  getComicsPages,
  getOneComic,
  createOneComic,
  deleteOneComic,
  updateOneComic,
  obtenerComics,
};
