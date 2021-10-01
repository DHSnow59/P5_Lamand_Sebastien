async function appelProduit() { // fonction asyncrone  qui permet d'appeler les produits
    return fetch("http://localhost:3000/api/products")
        .then(function(apiResponse) { // Creation d'une promesse  dans une fonction  pour retourner la valeur en json
            return apiResponse.json()
        })
        .catch(function(error) { // function en cas d'erreur
            console.log(error);
        })
}

function afficherProduit(articles) { // création d'une fonction afin d'afficher les produits
    const template = document.querySelector("article");
    const clone = document.importNode(template.content, true);

    clone.querySelector(".produit img").setAttribute("src", articles.imageUrl); // Création des clones de chaques élements afin de les appeler 
    clone.querySelector(".nom").textContent = articles.name;
    clone.querySelector(".prix").textContent = articles.price / 100 + "€";
    clone.querySelector(".btnproduit").setAttribute("href", "produit.html?id=" + articles._id);

    document.querySelector("main").appendChild(clone);

}

async function main() {
    let products = await appelProduit();
    for (article of products) { //création d'une boucle for pour appeller chaque articles dans products
        afficherProduit(article);
    }
}

main(); // appel de la fonction main pour afficher les articles