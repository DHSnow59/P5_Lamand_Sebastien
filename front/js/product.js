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
        const structureProduit = `
              <div class="item__img"> 
                <img src="${produit.imageUrl}" alt="${produit.altTxt}"> 
              </div>
              <div class="item__content">

              <div class="item__content__titlePrice">
                <h1 id="title">${produit.name}</h1>
                <p>Prix : <span id="price">${produit.price}</span>€</p>
              </div>

              <div class="item__content__description">
                <p class="item__content__description__title">Description :</p>
                <p id="description">${produit.description}</p>
              </div>

              <div class="item__content__settings">
              <div class="item__content__settings__color">
                <label for="color-select">Choisir une taille :</label>
                <select name="color-select" id="colors">
                  <option value="">--SVP, choisissez une couleur --</option>
                  <option value="vert">${produit.colors[0]}</option>
                  <option value="blanc">${produit.colors[1]}</option>
                  <option value="blanc">${produit.colors[2]}</option>
                </select>
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
    })
    //Si la promesse n'a pu être résolue, on récupère le motif du rejet
    .catch((error) => console.log(error));

//-------------------------------------Gestion du panier----------------------------------------------------------------------------------------
//La récupération des donnés délectionées par l'utilisateur

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

    //Récupération des valeurs du formulaire
    let optionsProduit = {
        name: promesse.name,
        promesse: promesse._id,
        colors: choixForm,
        quantity: quantity,
        price: promesse.price
    }
    console.log(optionsProduit);
});