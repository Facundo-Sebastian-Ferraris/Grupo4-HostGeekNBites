document.addEventListener("DOMContentLoaded", function () {
    fetch('../javascript/contactos.json')
        .then(response => response.json())
        .then(contactos => {
            const contenido = document.querySelector('.contenido');
            contactos.forEach(contacto => {
                let bloque = document.createElement('div');
                bloque.classList.add('bloque');

                let espacioBloque = document.createElement('div');
                espacioBloque.classList.add('espacio_bloque');

                // Crear el front
                let front = document.createElement('div');
                front.classList.add(contacto.frontClass);
                front.style.backgroundImage = `url('${contacto.backgroundImage}')`;
                front.style.backgroundPositionX = contacto.backgroundPositionX;
                front.style.transform = `scale(${contacto.scale})`;

                // Crear el back
                let back = document.createElement('div');
                back.classList.add('back');
                let cuerpoBloque = document.createElement('p');
                cuerpoBloque.classList.add('cuerpo_bloque');
                cuerpoBloque.innerHTML = `${contacto.backContent} <br><b>${contacto.boldText}</b>`;

                // Agregar elementos al bloque
                back.appendChild(cuerpoBloque);
                espacioBloque.appendChild(front);
                espacioBloque.appendChild(back);
                bloque.appendChild(espacioBloque);

                contenido.appendChild(bloque);
            });
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
});