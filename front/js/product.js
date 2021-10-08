//récupération de la lchaine de requete dans l'url
const chaineDeRequete_url_id = window.location.search;

// Extraction uniquement de Id
const id = chaineDeRequete_url_id.slice(4); // Enlève les 4 premiers caractères ===> ?id= 
console.log(id);




// Sélection de l'endroit ou injecter le code HTML
const positionElement = document.querySelector("article");
console.log(positionElement);

var produit
    // On récupère la promesse des données du produit par son id 
const promesse = fetch("http://localhost:3000/api/products/" + `${id}`);
// Une fois la promesse résolue, on travaille sur les valeurs récupérées
promesse.then(async(response) => {
        // Conversion des données en json en mettant await pour attendre la réponse de la promesse
        produit = await response.json();

        //la structure html pour l'affichage du produit sélectionné
        let structureProduit = `
              <div class="item__img"> 
                <img src="${produit.imageUrl}" alt="${produit.altTxt}"> 
              </div>
              <div class="item__content">

              <div class="item__content__titlePrice">
                <h1 id="title">${produit.name}</h1>
                <p>Prix : <span id="price">${produit.price}</span>€</p>
                <input type="hidden" value="${produit._id}" id="idProduit"/>
              </div>

              <div class="item__content__description">
                <p class="item__content__description__title">Description :</p>
                <p id="description">${produit.description}</p>
              </div>

              <div class="item__content__settings">
              <div class="item__content__settings__color">
                <label for="color-select">Choisir une taille :</label>
                <select name="color-select" id="colors">
                  <option value="">--SVP, choisissez une couleur --</option>`
        for (color of produit.colors) {
            structureProduit += `<option value="${color}">${color}</option>`;
        }
        structureProduit += `</select>
              </div>
              <div class="item__content__settings__quantity">
                  <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
                  <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
                </div>
              </div>

              <div class="item__content__addButton">
                <button id="addToCart">Ajouter au panier</button>
              </div>
`;

        positionElement.innerHTML = structureProduit;

        ajoutEvent();
    })
    //Si la promesse n'a pu être résolue, on récupère le motif du rejet
    .catch((error) => console.log(error));

//-------------------------------------Gestion du panier----------------------------------------------------------------------------------------
//La récupération des donnés sélectionées par l'utilisateur

function ajoutEvent() {
    //Sélection de l'id du formulaire
    const idForm = document.querySelector("#colors");

    //Sélection du bouton Ajouter au pânier
    let btnPanier = document.querySelector("#addToCart");
    console.log(btnPanier);

    //Ecouter le bouton et envoyer le panier
    btnPanier.addEventListener("click", (event) => {
        event.preventDefault(); // évite de actualisé la page lors du click bouton

        //Mettre le choix de l'utilisateur dans une variable
        let choixForm = idForm.value;

        // Vérification de la quantité saisi par l'utilisateur 
        if (document.getElementById("quantity").value > 0) {
            //Récupération des valeurs du formulaire
            let optionsProduit = {
                name: document.getElementById("title").textContent,
                id: document.getElementById("idProduit").value,
                colors: document.getElementById("colors").value,
                quantity: document.getElementById("quantity").value,
                price: document.getElementById("price").textContent,
            };

            // recuperation du tableau des produits déja présent dans le localStorage
            let tableauDesProduits = JSON.parse(localStorage.getItem("allProducts"));

            //fonction d'apparation d'un popup 
            function popupConfirmation() {
                if (alert(`${produit.name} couleur: ${color} a bien eté ajouté au panier, pour consulter le panier 
            appuyer sur OK ou sur ANNULER pour retourner a l'accueil.`)) {
                    window.location.href = "./panier.html";
                } else {
                    window.location.href = "./index.html";
                }
            };

            //Verification si le localStorage retourne du vide
            if (!tableauDesProduits || tableauDesProduits == 0) {
                // Si rien n'est retourné du localStorage on initialise le tableau des produits avec un tableau vide
                tableauDesProduits = [];
                popupConfirmation();
            } else {
                /*Si un tableau est retourné du localstorage, on filtre les donnée de ce tableau: retirer si il est deja 
                présent, le produit que nous voulons ajouter dans le localStorage (panier)*/
                tableauDesProduits = tableauDesProduits.filter(produit => produit.id !== optionsProduit.id);
                popupConfirmation();
            }
            // finalement on ajoute le produit dans le tableau des produits deja presents
            tableauDesProduits.push(optionsProduit);
            // on envoit vers le localstorage le tableau des produits selectionnés
            localStorage.setItem("allProducts", JSON.stringify(tableauDesProduits));

            // ici il va devoir faire le popup de redirection soit au panier soit au menu principal

        } else {
            alert("La Quantité de produit doit etre strictement supérieur à zéro");
        }
    });
}