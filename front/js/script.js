async function appelProduit() { // fonction asyncrone  qui permet d'appeler les produits
    return fetch("http://localhost:3000/api/products")
        .then(function(apiResponse) { // Creation d'une promesse  dans une fonction  pour retourner la valeur en json
            return apiResponse.json()
        })
        .catch(function(error) { // function en cas d'erreur
            console.log(error);
        })
}

function afficherProduit(articles, premier) { // création d'une fonction afin d'afficher les produits
    let template = document.querySelector(".items a");
    let clone = template;

    if (!premier) {
        clone = document.importNode(template, true);
    }
    clone.querySelector(".produit img").setAttribute("src", articles.imageUrl); // Création des clones de chaques élements afin de les appeler 
    clone.querySelector(".nom").textContent = articles.name;
    clone.querySelector(".prix").textContent = articles.price / 100 + "€";
    clone.querySelector(".productDescription").textContent = articles.description;
    clone.setAttribute("href", "./product.html?id=" + articles._id);

    document.querySelector(".items").appendChild(clone);

}

async function main() {
    let products = await appelProduit();
    let premier = true;
    for (article of products) { //création d'une boucle for pour appeller chaque articles dans products
        afficherProduit(article, premier);
        premier = false;
    }
}

main(); // appel de la fonction main pour afficher les articles