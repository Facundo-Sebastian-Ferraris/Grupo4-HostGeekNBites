//DIV Contenedor

const cartel = document.getElementById("cartel");
let latas;
fetch('../javascript/itemLatas.json')
  .then(response => response.json())  // Convertir la respuesta a JSON
  .then(data => {
    latas = data;                // Asignar los datos a la variable
    console.log(latas);              // Imprimir los datos en consola para verificar

    latas.forEach(item => {
        let div1 = document.createElement('div');
        div1.className = "producto";
    
        let div2 = document.createElement('div');
        div2.className = item.class;
        //div2.style.cssText = item.style;
        div2.style = item.style;
        //div2.setAttribute("style",item.style);
    
        div1.appendChild(div2);
    
        cartel.appendChild(div1);
    
    });
  })
  .catch(error => console.error('Error cargando el archivo JSON:', error));

