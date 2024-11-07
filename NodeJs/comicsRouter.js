const express = require('express'); //importamos express

const comicsRouter = express.Router(); //creamos el router

const fs = require("fs");


comicsRouter.get('/',(req,res)=>{
    //obtener del modelo el json de los comics
    //cont resul = modelo.....
    const data = readData();
    return res.send(JSON.stringify(data));
    //return res.json(data.comics);
});

const readData = () => {
    try {
      const data = fs.readFileSync("./bdComics.json"); //lee el archivo y lo almacena en data
      return JSON.parse(data); // parsea y retorna los datos como un objeto JavaScript
    } catch (error) {
      console.log(error);
    }
  };

  const writeData = (data) => {
    try {
      fs.writeFileSync("./bdComics.json", JSON.stringify(data)); // convierte el objeto data a JSON y lo escribe en el arcihvo json
    } catch (error) {
      console.log(error);
    }
  };


  //Endpoint para buscar un  comic por su id sino lo encuetra devuelve 404
  comicsRouter.get("/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id); //obtiene el id desde los parametros
    const comic = data.comics.find((comic) => comic.id === id); //busca el comic por el id
    if (!comic) {
      //sino existe el comic
      return res.status(404).json({ error: "Cómic no encontrado" });
    }
    res.json(comic); //devuelve el comic en formato json
  });
  
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
  
  //Endpoint para crear un nuevo comic
  comicsRouter.post("/", (req, res) => {
    const data = readData();
    const body = req.body; // obtiene el cuerpo de la solicitud
  
    //se validan los datos de entrada
    const error = validarComic(body);
    if (error) {
      return res.status(400).json({ error });
    }
    //crea un nuevo comic con los datos de body
    const nuevoComic = {
      id: data.comics.length + 1,
      ...body,
    };
  
    data.comics.push(nuevoComic); //agrega el nuevo comic en los datos
    writeData(data); //escribe los nuevos datos actualizados en el archivo
    res.json(nuevoComic); //devuelve el nuevo comic en formato json
  });
  
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
  
  //Endpoint para actualizar
  comicsRouter.put("/act/:id", (req, res) => {
    const data = readData();
    const body = req.body;
  
    const id = parseInt(req.params.id);
    const indiceComic = data.comics.findIndex((comic) => comic.id == id); //busca el indice del comic
  
    //sino se encuentra el comic
    if (indiceComic === -1) {
      return res.status(404).json({ error: "Cómic no encontrado" });
    }
  
    // se validan los datos de entrada
    const error = validarComicParcial(body);
    if (error) {
      return res.status(400).json({ error });
    }
    //actualiza el comic con los datos proporcionados
    data.comics[indiceComic] = {
      ...data.comics[indiceComic],
      ...body,
    };
  
    writeData(data); //escribe los datos en el archivo
    res.json({
      message: "Cómic actualizado correctamente",
      comic: data.comics[indiceComic], // devuelve el cómic actualizado en formato json
    });
  });
  
  // Endpoint para buscar varios cómics
  comicsRouter.get("/", (req, res) => {
    const data = readData(); // se lee el archivo JSON con los cómics
    // convierte los parámetros de consulta cantidad e inicio a enteros
    const cantidad = parseInt(req.query.cantidad);
    const inicio = parseInt(req.query.inicio);
  
    // se verifican que los parametros sean validos
    if (cantidad <= 0 || inicio < 0) {
      return res.status(400).json({ error: "Parámetros inválidos" });
    }
  
    // buscamos los comics en el arreglo
    const comicsSeleccionados = data.comics.slice(inicio, inicio + cantidad);
  
    //devuelve los comics
    res.json({
      comics: comicsSeleccionados,
    });
  });


module.exports = comicsRouter;