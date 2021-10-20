// recuperation du tableau des produits déja présent dans le localStorage
let tableauDesProduits = JSON.parse(localStorage.getItem("allProducts"));

//--------------------------L'AFFICHAGE DES PRODUITS DU PANIER-----------------------
//Sélection de la classe ou je vais injecter le code html 
const positionElement2 = document.querySelector("#cart__items");
//console.log(positionElement2);

//si le panier est vide  : afficher le panier est vide
if (tableauDesProduits === null || tableauDesProduits.length == 0) {
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
     <div>
        <p>Couleur : ${tableauDesProduits[i].colors}</p>
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

        //sélection de l'id et de la couleur du produit qui va etre supprimer en cliquant sur le bouton
        let idSelectionnerSuppression = tableauDesProduits[g].id;
        let colorSelectionnerSuppression = tableauDesProduits[g].colors;

        //on utilise la methode filter pour selectionner la méthode a garder et supprimer l'élément ou le bouton a été cliqué 
        tableauDesProduits = tableauDesProduits.filter(element =>
            element.id !== idSelectionnerSuppression || element.colors !== colorSelectionnerSuppression);

        // on envoit vers le localstorage le tableau des produits selectionnés
        localStorage.setItem("allProducts", JSON.stringify(tableauDesProduits));

        alert("Ce produit a été supprimer du panier");
        window.location.href = "cart.html";
    })
}

//-----------------------------------Quantité et montant total panier--------------------------------------
/* Si le tableau des produits n'est pas vide, on récupère la quantité totale et on calcule le montant total.
   Sinon, on les définis à O */
let quantityTotal
let prixTotal

if (tableauDesProduits === null || tableauDesProduits.length == 0) {
    quantityTotal = 0;
    prixTotal = 0;
} else {
    // Déclaration des variables pour pouvoir y mettre les quantités et prix qui sont présents dans le panier
    let quantityTotalCalcul = [];
    let prixTotalCalcul = [];

    // Aller chercher les quantités et prix dans le panier 
    for (let m = 0; m < tableauDesProduits.length; m++) {
        let quantityProduitPanier = parseInt(tableauDesProduits[m].quantity);
        let prixProduitPanier = parseInt(tableauDesProduits[m].price * quantityProduitPanier);

        //Mettre les quantités et prix du panier dans les variables "quantityTotalCalcul" et "prixTotalCalcul"
        quantityTotalCalcul.push(quantityProduitPanier);
        prixTotalCalcul.push(prixProduitPanier);
    }

    /* Additionner les quantités et prix qu'il y a dans le tableau des variables "quantityTotalCalcul" et "prixTotalCalcul"
       avec la methode .reduce */
    function reducer(accumulator, currentValue) {
        const parse = accumulator + currentValue
        return parse;
    }

    quantityTotal = quantityTotalCalcul.reduce(reducer);
    prixTotal = prixTotalCalcul.reduce(reducer);
}

//Sélection de la classe ou je vais injecter le code html 
const positionElement3 = document.querySelector(".cart__price");


//Le code HTML du prix total à afficher 
positionElement3.innerHTML = `
<p>Total (<span id="totalQuantity">${quantityTotal}</span> articles) : <span id="totalPrice">${prixTotal}</span> €</p>
`;


//--------------------------------Fin montant panier-----------------------------------------


//----------------------Formulaire de commande-------------------------------

let bouttonformu = document.querySelector("#order");
//Création d'un event sur le bouton formulaire lors du click de l'utilisateur
bouttonformu.addEventListener("click", (event) => {
    event.preventDefault();
    // Controle des valeurs des champs avec REGEX avant récupération 
    if (/^[A-zÀ-ú\s\-]{3,20}$/.test(document.querySelector("#firstName").value)) {

        if (/^[A-zÀ-ú\s\-]{3,20}$/.test(document.querySelector("#lastName").value)) {

            if (/^[A-zÀ-ú\s\-0-9]{3,50}$/.test(document.querySelector("#address").value)) {

                if (/^[A-zÀ-ú\s\-]{3,20}$/.test(document.querySelector("#city").value)) {

                    if (/^[A-z0-9\-]{3,20}@[A-z\-]{3,10}\.[A-z]{2,6}$/.test(document.querySelector("#email").value)) {

                        // Récupération du local storage
                        const array = JSON.parse(localStorage.getItem(localStorage.key("allProducts")));
                        if (array === null || array.length == 0) {
                            alert('Votre panier est vide');
                        } else {
                            const productId = []
                                // création d'une boucle for pour trier les Id du local storage 
                            for (let e = 0; e < localStorage.length; e++) {
                                productId[e] = array[e].id;
                            }


                            // Récuparation des valeurs du formulaire                         
                            const bodyorder = {
                                contact: {
                                    firstName: document.querySelector("#firstName").value,
                                    lastName: document.querySelector("#lastName").value,
                                    address: document.querySelector("#address").value,
                                    city: document.querySelector("#city").value,
                                    email: document.querySelector("#email").value,
                                },
                                products: productId,
                            };

                            // options de fetch
                            const options = {
                                method: 'POST',
                                body: JSON.stringify(bodyorder),
                                headers: {
                                    "Content-Type": "application/json"
                                },
                            };

                            // Envoie de la requête
                            fetch("http://localhost:3000/api/products/order", options)
                                .then(res => res.json())
                                .then(function(data) {
                                    localStorage.clear();
                                    localStorage.setItem("orderId", data.orderId);
                                    window.location.href = "confirmation.html";
                                })
                                .catch(function(err) {
                                    alert('Il y a eu un problème avec l\'opération fetch: ' + err.message);
                                });
                        }
                    } else {
                        document.getElementById('emailErrorMsg').innerHTML = "Email invalide, merci de respecter le format suivant : votre@adresse.email";
                    }
                } else {
                    document.getElementById('cityErrorMsg').innerHTML = "Ville invalide, merci de respecter le format suivant : Nom de votre ville";
                }
            } else {
                document.getElementById('addressErrorMsg').innerHTML = "Adresse invalide, merci de respecter le format suivant (les infos entre parenthèses sont facultatives) : (Etage 0 Batiment 0) 0 nom de votre rue";
            }
        } else {
            document.getElementById('lastNameErrorMsg').innerHTML = "Nom invalide, merci de respecter le format suivant : Votre nom de famille";
        }
    } else {
        document.getElementById('firstNameErrorMsg').innerHTML = "Prénom invalide, merci de respecter le format suivant : Votre prénom";
    }
});