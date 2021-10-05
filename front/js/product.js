/*async function appelProduit() { // fonction asyncrone  qui permet d'appeler les produits
    return fetch("http://localhost:3000/api/products/")
        .then(function(apiResponse) { // Creation d'une promesse  dans une fonction  pour retourner la valeur en json
            return apiResponse.json()
        })
        .catch(function(error) { // function en cas d'erreur
            console.log(error);
        })
}*/

//récuparation de la lchaine de requete dans l'url
const chaineDeRequete_url_id = window.location.search;
console.log(chaineDeRequete_url_id);

// Extraction uniquement de Id
const id = chaineDeRequete_url_id.slice(4); // Enlève les 4 premiers caractères ===> ?id= 
console.log(id);

// Sélection de l'endroit ou injecter le code HTML
const positionElement = document.querySelector("article");
console.log(positionElement);

const promesse = fetch("http://localhost:3000/api/products/" + `${id}`);
promesse.then(async(response) => {
        try {
            let produit = await response.json(); // Conversion des données en json en mettant await pour attendre la réponse de la promesse

            //la structure html pour l'affichage du produit sélectionné
            const structureProduit = `
              <div class="item__img"> 
                <img src="${produit.imageUrl}" alt="Photographie d'un canapé"> 
              </div>
              <div class="item__content">

              <div class="item__content__titlePrice">
                <h1 id="title"><!-- Nom du produit --></h1>
                <p>Prix : <span id="price"><!-- 42 --></span>€</p>
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
                  <!--                       <option value="vert">vert</option>
                  <option value="blanc">blanc</option> -->
                </select>
              </div>
`;

            positionElement.innerHTML = structureProduit;
        } catch (e) {
            console.log();
        }
    })
    .catch((error) => console.log(error));