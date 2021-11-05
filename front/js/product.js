//récupération de la lchaine de requete dans l'url
const chaineDeRequete_url_id = window.location.search;

// Extraction uniquement de Id
const id = chaineDeRequete_url_id.slice(4); // Enlève les 4 premiers caractères ===> ?id= 

var produit
    // On récupère la promesse des données du produit par son id 
const promesse = fetch("http://localhost:3000/api/products/" + `${id}`);
// Une fois la promesse résolue, on travaille sur les valeurs récupérées


promesse.then(async(response) => {
        // Conversion des données en json en mettant await pour attendre la réponse de la promesse
        produit = await response.json();

        //Mise à jour du HTML pour insérer les données du produit à afficher
        let structureProduit = document.querySelector("article");

        structureProduit.querySelector(".item__img img").setAttribute("src", produit.imageUrl);
        structureProduit.querySelector(".item__img img").setAttribute("alt", produit.altTxt);
        structureProduit.querySelector("#title").textContent = produit.name;
        structureProduit.querySelector("#price").textContent = produit.price;
        structureProduit.querySelector("#idProduit").setAttribute("value", produit._id);
        structureProduit.querySelector("#description").textContent = produit.description;

        // Création de la liste des balises HTML "option" pour alimenter le "select"
        let couleurs = ``;
        for (color of produit.colors) {
            couleurs += `<option value="${color}">${color}</option>`;
        }
        structureProduit.querySelector('#colors').insertAdjacentHTML('beforeend', couleurs);

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
                img: document.querySelector(".item__img > img").getAttribute("src"),
            };

            // recuperation du tableau des produits déja présent dans le localStorage
            let tableauDesProduits = JSON.parse(localStorage.getItem("allProducts"));

            //fonction d'apparition d'un popup 
            function popupConfirmation() {
                if (confirm(`${produit.name} couleur: ${choixForm} a bien eté ajouté au panier, pour consulter le panier 
            appuyer sur OK ou sur ANNULER pour retourner a l'accueil.`)) {
                    window.location.href = "./cart.html";
                } else {
                    window.location.href = "./index.html";
                }
            };

            // Par défaut, le tableau des produits n'est pas mis à jour
            let isUpdated = false;
            // Verification si le localStorage retourne du vide
            if (!tableauDesProduits || tableauDesProduits == 0) {
                // Si rien n'est retourné du localStorage on initialise le tableau des produits avec un tableau vide
                tableauDesProduits = [];
            } else {
                /* Si un tableau est retourné du localstorage, on vérifie si le couple id/colors est déjà présent dans le tableau des produits.
                   Si oui, on met à jour la quantité dans le tableau des produits */
                tableauDesProduits.forEach((element, index, array) => {
                    if (array[index].id === optionsProduit.id && array[index].colors === optionsProduit.colors) {
                        array[index].quantity = parseInt(array[index].quantity) + parseInt(optionsProduit.quantity);
                        isUpdated = true;
                    }
                });
            }
            // On ajoute le produit dans le tableau des produits deja presents si aucune mise à jour n'a été effectuée
            if (!isUpdated) {
                tableauDesProduits.push(optionsProduit);
            }
            // on envoit vers le localstorage le tableau des produits selectionnés
            localStorage.setItem("allProducts", JSON.stringify(tableauDesProduits));
            //Appel du PopUp
            popupConfirmation();

        } else {
            alert("La Quantité de produit doit etre strictement supérieur à zéro");
        }
    });
}