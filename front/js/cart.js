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
        <div> le panier est vide</div>
    </div>`;
    positionElement2.innerHTML = panierVide;
} else {
    //Si le panier n'est pas vide : afficher ce qui a dans le panier
    let produitPanier = [];

    for (i = 0; i < tableauDesProduits.length; i++) {
        produitPanier = produitPanier + `
        <article class="cart__item" data-id="{product-ID}">
        <div class="cart__item__img">
          <img src=" ` /*${tableauDesProduits[i].length.imageUrl}*/
        ` " alt="Photographie d'un canapé">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__titlePrice">
            <h2>${tableauDesProduits[i].length.name}</h2>
            <p>${tableauDesProduits[i].length.price} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté :  </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
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