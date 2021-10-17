// recuperation du tableau des produits déja présent dans le localStorage
let tableauDesProduits = JSON.parse(localStorage.getItem("allProducts"));

//--------------------------L'AFFICHAGE DES PRODUITS DU PANIER-----------------------
//Sélection de la classe ou je vais injecter le code html 
const positionElement2 = document.querySelector("#cart__items");
//console.log(positionElement2);

//si le panier est vide : afficher le panier est vide
if (tableauDesProduits === null) {
    const panierVide = `
    <div class"container-panier-vide">
        <div> le panier est vide </div>
    </div>`;
    positionElement2.innerHTML = panierVide;
} else {
    //Si le panier n'est pas vide : afficher ce qui a dans le panier
    for (i = 0; i < tableauDesProduits.length; i++) {
        positionElement2.innerHTML += `
   <article class="cart__item" data-id="${tableauDesProduits[i].id}">
   <div class="cart__item__img">
     <img src="${tableauDesProduits[i].img}" alt="Photographie d'un canapé">
   </div>
   <div class="cart__item__content">
     <div class="cart__item__content__titlePrice">
       <h2>${tableauDesProduits[i].name} </h2>
       <p> ${tableauDesProduits[i].price} € </p>
     </div>
     <div class="cart__item__content__settings">
       <div class="cart__item__content__settings__quantity">
         <p>Qté :  </p>
         <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${tableauDesProduits[i].quantity}">
       </div>
       <div class="cart__item__content__settings__delete">
         <p class="deleteItem">Supprimer</p>
       </div>
     </div>
   </div>
 </article> 
   `;
    }
}

//---------------------------------------Gestion du boutton supprimer l'article--------------------------------

//Sélection des références de tous les boutons 
let btnSupprimer = document.querySelectorAll(".deleteItem");

for (let g = 0; g < btnSupprimer.length; g++) {
    btnSupprimer[g].addEventListener("click", (event) => {
        event.preventDefault();

        //sélection de l'id du produit qui va etre supprimer en cliquant sur le bouton
        let idSelectionnerSuppresion = tableauDesProduits[g].id;

        //on utilise la methode filter pour selectionner la méthode a garder et supprimer l'élément ou le bouton a été cliqué 
        tableauDesProduits = tableauDesProduits.filter(element => element.id !== idSelectionnerSuppresion);

        // on envoit vers le localstorage le tableau des produits selectionnés
        localStorage.setItem("allProducts", JSON.stringify(tableauDesProduits));

        alert("Ce produit a été supprimer du panier");
        window.location.href = "cart.html";
    })
}

//-----------------------------------Montant total panier--------------------------------------
//Déclaration de la variable pour pouvoir y mettre les prix qui sont présents dans le panier
let prixTotalCalcul = [];

// Aller chercher les prix dans le panier 
for (let m = 0; m < tableauDesProduits.length; m++) {
    let prixProduitPanier = parseInt(tableauDesProduits[m].price);

    //Mettre les prix du panier dans la variable "prixTotalCalcul"
    prixTotalCalcul.push(prixProduitPanier)
}

//Additionner les prix qu'il y a dans le tableau de la variable "prixTotalCalcul" avec la methode .reduce
//const reducer = parseInt(accumulator, currentValue) => accumulator + currentValue;
function reducer(accumulator, currentValue) {
    const parse = accumulator + currentValue
    return parse;
}
let prixTotal = prixTotalCalcul.reduce(reducer);
console.log(prixTotal);

//Sélection de la classe ou je vais injecter le code html 
const positionElement3 = document.querySelector(".cart__price");


//Le code HTML du prix total à afficher 
positionElement3.innerHTML = `
<p>Total (<span id="totalQuantity"><!-- 2 --></span> articles) : <span id="totalPrice">${prixTotal}</span> €</p>
`;


/*let affichagePrixDom = document.querySelector("#totalPrice");
affichagePrixDom = prixTotal;
console.log(affichagePrixDom);*/

//--------------------------------Fin montant panier-----------------------------------------


//----------------------Formulaire de commande-------------------------------

let bouttonformu = document.querySelector("#order");
//Création d'un event sur le bouton formulaire lors du click de l'utilisateur
bouttonformu.addEventListener("click", (event) => {
    event.preventDefault();
    // Controle des valeurs des champs avant récupération
    if (/^[A-zÀ-ú\s\-]{3,20}$/.test(document.querySelector("#firstName").value)) {
        if (/^[A-zÀ-ú\s\-]{3,20}$/.test(document.querySelector("#lastName").value)) {
            console.log("OK 1");
            if (/^[A-zÀ-ú\s\-0-9]{3,50}$/.test(document.querySelector("#address").value)) {
                console.log("OK 2");
                if (/^[A-zÀ-ú\s\-]{3,20}$/.test(document.querySelector("#city").value)) {
                    console.log("OK 3");
                    if (/^[A-z0-9\-]{3,20}@[A-z\-]{3,10}\.[A-z]{2,6}$/.test(document.querySelector("#email").value)) {
                        console.log("OK 4");
                        const formulairesValues = {
                            prenom: document.querySelector("#firstName").value,
                            nom: document.querySelector("#lastName").value,
                            adresse: document.querySelector("#address").value,
                            ville: document.querySelector("#city").value,
                            email: document.querySelector("#email").value
                        }
                    } else {
                        console.log("Email invalide, merci de respecter le format suivant : votre@adresse.email");
                    }
                } else {
                    console.log("Ville invalide, merci de respecter le format suivant : Nom de votre ville");
                }
            } else {
                console.log("Adresse invalide, merci de respecter le format suivant (les infos entre parenthèses sont facultatives) : (Etage 0 Batiment 0) 0 nom de votre rue");
            }
        } else {
            console.log("Nom invalide, merci de respecter le format suivant : Votre nom de famille");
        }
    } else {
        console.log("Prénom invalide, merci de respecter le format suivant : Votre prénom");
    }



});