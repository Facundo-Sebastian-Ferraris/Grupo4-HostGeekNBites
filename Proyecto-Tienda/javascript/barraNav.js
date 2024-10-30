const navBar = document.getElementById('navegador')


//crear icono de ir a menu
const logo = document.createElement("a");
logo.className = "logo";
logo.href = "../HTML/index.html";

const imagen = document.createElement("img");
imagen.className = "imagenLogo";
imagen.src = "../assets/01-logo.jpeg";

//crear botones
const navItems =
[
    {   class: 'boton',    href: '../HTML/indexComida.html',   text: 'COMIDA'  },
    {   class: 'boton',    href: '../HTML/indexComics.html',   text: 'COMICS'  },
    {   class: 'boton',    href: '../HTML/indexContacto.html', text: 'CONTACTO'}
];


//insercion de menu

logo.appendChild(imagen);
navBar.appendChild(logo);

//inserciones de botones
navItems.forEach(item => {
    let a = document.createElement('a');
    a.className = item.class;  
    a.href = item.href;
    a.textContent = item.text;
    navBar.appendChild(a);
});
