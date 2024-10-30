//referencias a elementos DOM
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");

const paper1 = document.querySelector("#p1");
const paper2 = document.querySelector("#p2");
const paper3 = document.querySelector("#p3");

//eventos
prevBtn.addEventListener("click", irAnteriorPagina);
nextBtn.addEventListener("click", irSiguientePagina);

// Agregar evento de teclado para las teclas de flecha
document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowLeft") {
      irAnteriorPagina();
  } else if (event.key === "ArrowRight") {
      irSiguientePagina();
  }
});

//variables
let locacionActual = 1;
let numDeHojas = 3;
let locacionMax = numDeHojas + 1;

function abrirLibro() {
  book.style.transform = "translateX(50%)";
  prevBtn.style.transform = "translateX(-180px)";
  nextBtn.style.transform = "translateX(180px)";
}

function cerrarLibro(isAtBeginning) {
  if (isAtBeginning) {
    book.style.transform = "translateX(0%)";
  } else {
    book.style.transform = "translateX(100%)";
  }

  prevBtn.style.transform = "translateX(0px)";
  nextBtn.style.transform = "translateX(0px)";
}

function irSiguientePagina() {
  if (locacionActual < locacionMax) {
    switch (locacionActual) {
      case 1:
        abrirLibro();
        paper1.classList.add("flipped");
        paper1.style.zIndex = 1;
        break;
      case 2:
        paper2.classList.add("flipped");
        paper2.style.zIndex = 2;
        break;
      case 3:
        paper3.classList.add("flipped");
        paper3.style.zIndex = 3;
        cerrarLibro();
        break;
      default:
        throw new Error("unknow state");
    }
    locacionActual++;
  }
}

function irAnteriorPagina() {
  if (locacionActual > 1) {
    switch (locacionActual) {
      case 2:
        cerrarLibro(true);
        paper1.classList.remove("flipped");
        paper1.style.zIndex = 3;
        break;
      case 3:
        paper2.classList.remove("flipped");
        paper2.style.zIndex = 2;
        break;
      case 4:
        abrirLibro();
        paper3.classList.remove("flipped");
        paper3.style.zIndex = 1;
        break;
      default:
        throw new Error("unknow state");
    }
    locacionActual--;
  }
}
