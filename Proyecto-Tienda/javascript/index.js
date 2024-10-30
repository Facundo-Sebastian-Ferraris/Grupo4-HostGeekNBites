//DIV Contenedor
const contenedor = document.getElementById('contenedor');

let 
    div_centralizador   = document.createElement('div'),
    h1_bienvenida       = document.createElement('h1'),
    img_logoGiratorio   = document.createElement('img'),
    div_contenedorFinal = document.createElement('div');

// asignacion de clase
div_centralizador.className = "centralizador";
h1_bienvenida.className     = "bienvenida";
img_logoGiratorio.classList = "imagen_centrada logoImg girar";
img_logoGiratorio.src = "../assets/01-logo.jpeg";
img_logoGiratorio.alt = "logoGirador";
div_contenedorFinal.className = "contenedorFinal";

// colocacion de contenidos
h1_bienvenida.textContent = "¡Bienvenidos a Geek&Bites!";

// conexion de nodos
contenedor.appendChild(div_centralizador);
div_centralizador.appendChild(h1_bienvenida);
div_centralizador.appendChild(img_logoGiratorio);
contenedor.appendChild(div_contenedorFinal);




//insercion de contenidos
let contenido;
fetch('../javascript/indexContent.json')
  .then(response => response.json())  // Convertir la respuesta a JSON
  .then(data => {
    contenido = data;                // Asignar los datos a la variable
    // console.log(contenido);        

    contenido.forEach(elemento => {
        let div_efecto = document.createElement('div');
        div_efecto.className = "efecto";
        
        //obtencion instancias
        let
            all_instancia = elemento.contenido,
            p_instancia = all_instancia.p,
            img_instancia = all_instancia.img;

        //creacion de tags
        let
            p_txt = document.createElement('p'),
            img_imagen = document.createElement('img');

        //insercion de propiedades
        p_txt.textContent = p_instancia.descripcion;
        img_imagen.className = img_instancia.class;
        img_imagen.src = img_instancia.src;
        img_imagen.alt = img_instancia.alt;
        img_imagen.loading = "lazy";


        div_efecto.appendChild(p_txt);
        div_efecto.appendChild(img_imagen);
        div_centralizador.appendChild(div_efecto);
    });

})
.catch(error => console.error('Error cargando el archivo JSON:', error));


let 
    div_hechoPor = document.createElement('div'),
    p_hechoPor = document.createElement('p');

div_hechoPor.classList = "credito credito_Hecho tambalear";
p_hechoPor.className = "hecho";
p_hechoPor.textContent = "Hecho Por";

div_hechoPor.appendChild(p_hechoPor);
div_contenedorFinal.appendChild(div_hechoPor);
//insercion de creditos
let credi;
fetch('../javascript/creditos.json')
  .then(response => response.json())  // Convertir la respuesta a JSON
  .then(data => {
    credi = data;                // Asignar los datos a la variable

    credi.forEach(elemento => {
        let
            all_instancia = elemento.creditos,
            img_instancia = all_instancia.img,
            p_instancia = all_instancia.p;

        
        let 
            div_cred_cont = document.createElement('div');
            div_cred_cont.classList = "credito_foto_contenedor foto_contenedor";
            div_cred_cont.style=all_instancia.style;
        
        let img_perfil = document.createElement('img');
        img_perfil.classList = "credito_formato_foto";
        img_perfil.src = img_instancia.src;
        img_perfil.loading = "lazy";

        let p_integrante = document.createElement('p');
        p_integrante.className = p_instancia.class;
        p_integrante.textContent = p_instancia.nombre;

        div_cred_cont.appendChild(img_perfil);
        div_cred_cont.appendChild(p_integrante);
        
        div_contenedorFinal.appendChild(div_cred_cont);
    });

})
.catch(error => console.error('Error cargando el archivo JSON:', error));
