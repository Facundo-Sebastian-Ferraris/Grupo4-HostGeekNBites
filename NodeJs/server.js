//primero ejecuta los siguientes comandos:
// estando en la carpeta donde tenes el script
// npm init -y
// npm install express

//importa el express
const express = require("express");

const bodyParser = require("body-parser");

//instancia express
const app = express();

app.use(bodyParser.json());

/*DUDAS IP*/
/*
si pones localhost, lo que estas haciendo es hostear pero de forma interna al equipo.
Si le asignas la IP, podes hostear de forma LAN (cualquiera que este conectado a la misma red, puede acceder)

Como obtener mi IP (linux):
en terminal ejecutas: ip addr show

busca el item que contenga algo con w, en mi caso tengo wlps y algo xd.
la ip ahi sera lo que esta en INET, y copiar hasta al ultimo digito que dps hay un /
por ejemplo  inet 111.11.111.111/16, solo copias 111.11.111.111 
*/

const ip = "172.16.100.172";
// const ip = 'localhost';

//puede ser cualquier puerto pero que sea superior a 1024, 3000 es buena opcion
//y la mas usado cuando se aprende.
const puerto = "3030";

//importamos path que otorga direcciones compaible para cualquier OS
const path = require("path");

// usaremos el file system nomas para verificar si existe algun elemento
// es una cuestion para ver si cometimos typos o alguna ruta incorrecta ;)
const fs = require("fs");

// con el path, creamos la direccion donde se encuentra nuestro proyecto
const staticPath = path.join(__dirname, "../Proyecto-Tienda");

//imprimimos para observar si es la ruta que deseamos usar
console.log("Ruta del proyectos:", staticPath);

// con fs preguntamos si la ruta existe, de no ser asi, finalizamos el codigo
if (!fs.existsSync(staticPath)) {
  console.error("Che cap@, me diste una ruta inexistente:", staticPath);
  process.exit(1);
} else {
  console.log("alfin, tanto te costo darme la ruta buena?");
}

// asignamos la direccion del index
const indexPath = path.join(staticPath, "/HTML/index.html");

// y con fs probamos si existe
if (!fs.existsSync(indexPath)) {
  console.error(
    "todo bien con la ruta, pero y el archivo? mira lo que me pasaste:",
    indexPath
  );
  process.exit(1);
} else {
  console.log("vamaaah bien ahi, el index funcaaaaaa");
}

// agregamos al servidor la ruta del proyecto
app.use(express.static(staticPath));

// cuando el usuario entre al server, se lo llevara al index
app.get("/", (req, res) => {
  // "/" indica la raiz
  res.sendFile(indexPath);
});

// abrimos el server en el puerto que especificamos
app.listen(puerto, () => {
  console.log(
    "mucho tramite, pero finalmente aca esta el link: http://" +
      ip +
      ":" +
      puerto
  );
});
// luego con npm start deberias poder abrir el servidor
// tambien con node server.js (si asi llama este archivo)

//------------------------------------Endpoints--------------------------------------------

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

//Endponit para buscar todos los recursos
app.get("/api/comics/todos", (req, res) => {
  const data = readData(); //lee los datos del archivo
  res.json(data.comics); //devuelve todos los comics en formato json
});

//Endpoint para buscar un  comic por su id sino lo encuetra devuelve 404
app.get("/api/comics/:id", (req, res) => {
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
app.post("/api/comics/", (req, res) => {
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
app.put("/api/comics/act/:id", (req, res) => {
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
app.get("/api/comics/", (req, res) => {
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
