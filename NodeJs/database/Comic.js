//Clase Comic
//Se comunica directamente con la BD
const fs = require("fs");

const getAllComics = () =>{
    const file = readData();
    const datos = file.comics;
    return datos;
}

const getComicsPages = (inicio, fin) =>{
    const file = readData();
    const datos = file.comics;
    const resul = datos.slice(inicio, inicio +fin);
    console.log(resul);
    return resul;
}

const getOneComic = (id) =>{
    const file = readData();
    const datos = file.comics;
    const comic = datos.find(comic => comic.id === id);
    return comic;
}

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
    const comic = datos.find(comic => comic.id === id);
    const pos = file.comics.indexOf(comic);
    var valor = 0;
    if(pos >= 0){
        file.comics.splice(pos,1);
        escribirDatos(file);
        valor = 1;
    }
    return valor;
};

const updateOneComic = (id, body) => {
    const file = readData();
    const datos = file.comics;
    const pos = datos.findIndex(comic => comic.id === id); //obtenemos el comic que queremos actualizar
    //const comic = datos.find(comic => comic.id === id);
    //const pos = file.comics.indexOf(comic);
    var logrado = 0;
    if(pos > -1){
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
    updateOneComic
};