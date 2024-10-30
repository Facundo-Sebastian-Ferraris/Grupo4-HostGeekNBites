//DIV Contenedor
const contenedor = document.getElementById('contenido');


let menu;
fetch('../javascript/itemComidas.json')
  .then(response => response.json())  // Convertir la respuesta a JSON
  .then(data => {
    menu = data;                // Asignar los datos a la variable
    console.log(menu);        

    menu.forEach(menu => {
        let div = document.createElement('div');
        div.className = "card";
        
            //segundo div, de contenido
            let div2 = document.createElement('div');
            div2.className = "card__content";
        
                //tercer div, del frente
                let div3 = document.createElement('div');
        
                let unContenido = menu.frente;
        
                div3.className = unContenido.class;
    
                div3.style.backgroundImage = "url("+menu.url+")";
    
        
                    //armamos los componentes internos del frente
                    let aux = unContenido.contenido;
        
                    let aux2 = aux.h3;
                    //el H3
                    let h3 = document.createElement('h3');
                    h3.className = aux2.class;
                    h3.textContent = aux2.descripcion;
        
                    //el parrafo
                    aux2 = aux.p;
                    let p = document.createElement('p');
                    p.className = aux2.class;
                    p.textContent = aux2.descripcion;
        
                div3.appendChild(h3);
                div3.appendChild(p);
                
                //CUARTO DIV, DEL BACK
                let div4 = document.createElement('div');
                
                unContenido = menu.reverso;
                div4.className = unContenido.class;
                
                    //armamos los componentes internos del back
                    aux = unContenido.contenido;
        
                    //el parrafo
                    aux2 = aux.p;
                    p = document.createElement('p');
                    p.className = aux2.class;
                    p.textContent = aux2.descripcion;
        
                div4.appendChild(p);
            
            div2.appendChild(div3);
            div2.appendChild(div4);
        
        div.appendChild(div2);
        
        //agregamos la carta al contenedor
        
        contenedor.appendChild(div);
        
    });

})
.catch(error => console.error('Error cargando el archivo JSON:', error));





