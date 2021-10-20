const orderId = localStorage.getItem("orderId");
const idComfir = document.getElementById("orderId");
idComfir.innerText = orderId;
localStorage.clear();