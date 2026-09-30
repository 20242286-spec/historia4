let abiertos = 1;

// Autoasignación: el ticket pasa de "Disponibles" a "Mi bandeja"
function autoasignar(n) {
  document.getElementById("mio" + n).style.display = "flex";
  document.getElementById("libre" + n).style.display = "none";

  abiertos = abiertos + 1;
  document.getElementById("nAbiertos").innerHTML = abiertos;
}
