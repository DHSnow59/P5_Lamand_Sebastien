// recuperation du tableau des produits déja présent dans le localStorage
let tableauDesProduits = JSON.parse(localStorage.getItem("allProducts"));
console.log(tableauDesProduits);

//--------------------------L4AFFICHAGE DES PRODUITS DU PANIER-----------------------
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
        console.log(tableauDesProduits.length);
    }
}

//---------------------------------------Gestion du boutton supprimer l'article--------------------------------

//Sélection des références de tous les boutons 
let btnSupprimer = document.querySelector(".deleteItem");
console.log(btnSupprimer);

for (let g = 0; g < btnSupprimer.length; g++) {
    btnSupprimer[g].addEventListener("click", (event) => {
        event.preventDefault();

        //sélection de l'id du produit qui va etre supprimer en cliquant sur le bouton
        let idSelectionnerSuppresion = tableauDesProduits[g].id;
        console.log("Je suis ici " + idSelectionnerSuppresion);

        //on utilise la methode filter pour selectionner la méthode a garder et supprimer l'élément ou le bouton a été cliqué 
        tableauDesProduits = tableauDesProduits.filter(element => element.id !== idSelectionnerSuppresion);

        // on envoit vers le localstorage le tableau des produits selectionnés
        localStorage.setItem("allProducts", JSON.stringify(tableauDesProduits));

        alert("Ce produit a été supprimer du panier");
        window.location.href = "panier.html";
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

    console.log(prixTotalCalcul);
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

function afficherFormulaireHtml() {
    //Sélection élèment du DOM pour le positionnement 
    const positionElement4 = document.querySelector(".cart__order");

    //injection HTML
    positionElement4.innerHTML = `
    <form method="get" class="cart__order__form">
        <div class="cart__order__form__question">
            <label for="firstName">Prénom: </label>
            <input type="text" name="firstName" id="firstName" required>
            <p id="firstNameErrorMsg">
                <!-- ci est un message d'erreur -->
            </p>
        </div>
        <div class="cart__order__form__question">
            <label for="lastName">Nom: </label>
            <input type="text" name="lastName" id="lastName" required>
            <p id="lastNameErrorMsg"></p>
        </div>
        <div class="cart__order__form__question">
            <label for="address">Adresse: </label>
            <input type="text" name="address" id="address" required>
            <p id="addressErrorMsg"></p>
        </div>
        <div class="cart__order__form__question">
            <label for="city">Ville: </label>
            <input type="text" name="city" id="city" required>
            <p id="cityErrorMsg"></p>
        </div>
        <div class="cart__order__form__question">
            <label for="email">Email: </label>
            <input type="email" name="email" id="email" required>
            <p id="emailErrorMsg"></p>
        </div>
        <div class="cart__order__form__submit">
            <input type="submit" value="Commander !" id="order">
        </div>
    </form>
  `;


    // positionElement4.insertAdjacentElement("afterend", structureFormulaire);
}

//Affichage du formulaire
afficherFormulaireHtml();