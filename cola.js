// Mostrar y ocultar las ventanas (modales)
function mostrar(id) {
  document.getElementById(id).style.display = "block";
}

function ocultar(id) {
  document.getElementById(id).style.display = "none";
}

// Filtros y búsqueda: muestra solo las filas que contienen lo elegido
function filtrar() {
  let q = document.getElementById("buscar").value.toLowerCase();
  let cat = document.getElementById("fCat").value.toLowerCase();
  let pri = document.getElementById("fPri").value.toLowerCase();
  let amb = document.getElementById("fAmb").value.toLowerCase();
  let est = document.getElementById("fEst").value.toLowerCase();

  for (let i = 1; i <= 5; i++) {
    let fila = document.getElementById("fila" + i);
    let texto = fila.innerHTML.toLowerCase();

    if (texto.includes(q) && texto.includes(cat) && texto.includes(pri) && texto.includes(amb) && texto.includes(est)) {
      fila.style.display = "flex";
    } else {
      fila.style.display = "none";
    }
  }
}

// Ordenar: usa la propiedad "order" de Flexbox
function ordenar() {
  let criterio = document.getElementById("orden").value;

  for (let i = 1; i <= 5; i++) {
    let fila = document.getElementById("fila" + i);

    if (criterio === "prioridad") {
      fila.style.order = fila.dataset.pri;
    } else if (criterio === "sinatencion") {
      fila.style.order = 1000 - fila.dataset.idle;
    } else {
      fila.style.order = 1000 - fila.dataset.min;
    }
  }
}

// Asignar o reasignar a los tickets marcados
function asignar() {
  let tecnico = document.getElementById("selTec").value;
  let motivo = document.getElementById("motivoAsignar").value;

  // 1. Si alguno ya tenía técnico, el motivo es obligatorio
  for (let i = 1; i <= 5; i++) {
    let marcado = document.getElementById("chk" + i).checked;
    let tieneTecnico = document.getElementById("tec" + i).innerHTML !== "Sin asignar";
    if (marcado && tieneTecnico && motivo === "") {
      alert("Para reasignar escribe el motivo.");
      return;
    }
  }

  // 2. Cambiar el técnico de los marcados
  for (let i = 1; i <= 5; i++) {
    if (document.getElementById("chk" + i).checked) {
      document.getElementById("tec" + i).innerHTML = tecnico;
      document.getElementById("chk" + i).checked = false;
    }
  }
  ocultar("modalAsignar");
}

// Cambiar la prioridad de los tickets marcados (con motivo)
function cambiarPrioridad() {
  let nueva = document.getElementById("selPri").value;
  let motivo = document.getElementById("motivoPri").value;

  if (motivo === "") {
    alert("Escribe el motivo del cambio.");
    return;
  }

  // la clase CSS es el nombre en minúscula y sin tilde
  let clase = nueva.toLowerCase();
  if (nueva === "Crítica") {
    clase = "critica";
  }

  for (let i = 1; i <= 5; i++) {
    if (document.getElementById("chk" + i).checked) {
      document.getElementById("pri" + i).innerHTML = nueva;
      document.getElementById("pri" + i).className = clase;
      // posición en la lista (1 = crítica ... 4 = baja), sirve para ordenar
      document.getElementById("fila" + i).dataset.pri = document.getElementById("selPri").selectedIndex + 1;
      document.getElementById("chk" + i).checked = false;
    }
  }
  ocultar("modalPrioridad");
}

// Devolver a la cola: quita el técnico y vuelve a "Abierto"
function devolver() {
  for (let i = 1; i <= 5; i++) {
    if (document.getElementById("chk" + i).checked) {
      document.getElementById("tec" + i).innerHTML = "Sin asignar";
      document.getElementById("est" + i).innerHTML = "Abierto";
      document.getElementById("chk" + i).checked = false;
    }
  }
}
