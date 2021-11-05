// recuperation du tableau des produits déja présent dans le localStorage
let tableauDesProduits = JSON.parse(localStorage.getItem("allProducts"));

//--------------------------L'AFFICHAGE DES PRODUITS DU PANIER-----------------------
//Mise à jour du HTML pour afficher les produits contenus dans le panier
let structureProduits = document.querySelector("#cart__items");
let panierVide = structureProduits.querySelector(".container-panier-vide");
let structureProduit = structureProduits.querySelector(".cart__item");

//si le panier est vide  : afficher le panier est vide
if (tableauDesProduits === null || tableauDesProduits.length == 0) {
    panierVide.style.display = "block";
} else {
    //Si le panier n'est pas vide : afficher ce qu'il y a dans le panier
    for (i = 0; i < tableauDesProduits.length; i++) {
        if (i > 0) {
            structureProduits.append(structureProduit.cloneNode(true)); //cloneNode permet de reproduire le même contenu au lieu de le déplacer
        }

        structureProduits.lastElementChild.style.display = "flex";

        structureProduits.lastElementChild.setAttribute("data-id", tableauDesProduits[i].id);
        structureProduits.lastElementChild.querySelector(".cart__item__img img").setAttribute("src", tableauDesProduits[i].img);
        structureProduits.lastElementChild.querySelector(".cart__item__content__titlePrice h2").textContent = tableauDesProduits[i].name;
        structureProduits.lastElementChild.querySelector(".cart__item__content__titlePrice p").textContent = tableauDesProduits[i].price + " €";
        structureProduits.lastElementChild.querySelector(".cart__item__content__color p").textContent = "Couleur : " + tableauDesProduits[i].colors;
        structureProduits.lastElementChild.querySelector(".itemQuantity").setAttribute("value", tableauDesProduits[i].quantity);
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


let quantites = document.querySelectorAll(".itemQuantity");
let prixTotalProduit = document.querySelectorAll(".cart__item__content__titlePrice p");

// Récupération du nombres d'articles/prix du panier
for (let index = 0; index < quantites.length; index++) {
    quantites[index].addEventListener("change", (event) => {
        event.preventDefault();
        let newQuantite = quantites[index].value;
        tableauDesProduits[index].quantity = newQuantite;
        localStorage.setItem("allProducts", JSON.stringify(tableauDesProduits));
        prixTotalProduit[index].textContent = (newQuantite * parseInt(tableauDesProduits[index].price)) + " €";
        tableauDesProduits = JSON.parse(localStorage.getItem("allProducts"));
        afficherProduitTotal();
    })
}
afficherProduitTotal();

function afficherProduitTotal() {

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

    //Mise à jour du HTML pour afficher la quantité totale et le prix total 
    let totalPanier = document.querySelector(".cart__price");

    totalPanier.querySelector("#totalQuantity").textContent = quantityTotal;
    totalPanier.querySelector("#totalPrice").textContent = prixTotal;
};

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