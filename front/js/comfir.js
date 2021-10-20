// Récupération de l'orderId et affichage dans la page html
const orderId = localStorage.getItem("orderId");
const idComfir = document.getElementById("orderId");
idComfir.innerText = orderId;
//On efface la totalité du localStorage
localStorage.clear();