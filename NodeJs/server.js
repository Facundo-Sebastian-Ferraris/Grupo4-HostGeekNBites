//primero ejecuta los siguientes comandos:
// estando en la carpeta donde tenes el script
// npm init -y
// npm install express

//importa el express
const express = require("express");

const bodyParser = require("body-parser");

//instancia express
const app = express();

const readData = () => {
  try {
    const data = fs.readFileSync("./bdComics.json");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync("./bdComics.json", JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

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

const ip = "192.168.0.8";
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

//Endponit para buscar todos los recursos
app.get("/api/comics", (req, res) => {
  const data = readData();
  res.json(data.comics);
});

//Endpoint para buscar un  comic por su id sino lo encuetra devuelve 404
app.get("/api/comics/:id", (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const comic = data.comics.find((comic) => comic.id === id);
  if (!comic) {
    // Si el cómic no se encuentra, respondemos con un 404 y un mensaje de error.
    return res.status(404).json({ error: "Cómic no encontrado" });
  }
  res.json(comic);
});
