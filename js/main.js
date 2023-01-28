
let products = [];

fetch("./js/items.json")
    .then( response => response.json())
    .then( data => {
        products = data;
        loadProducts(products);
    })


const containerProducts = document.querySelector("#container-products");
const categoryButtons = document.querySelectorAll(".menu-button");
const titlePrincipal = document.querySelector("#title-principal");
let buttonAgregar;
const numberShop = document.querySelector("#numberShop");




//cargar productos al html 

function loadProducts(selectProducts) {

    containerProducts.innerHTML = "";

    selectProducts.forEach(products => {

        const div = document.createElement("div");
        div.classList.add("products");
        div.innerHTML = `
        <img class="product-img" src="${products.image}" alt="${products.title}">
        <div class="products-detail">
            <h4 class="product-name">${products.title}</h4>
            <p class="product-price">$${products.price}</p>
            <button class="product-button" id="${products.id}">Agregar</button>
        </div>
        `;

        containerProducts.append(div);

    })

    updateAgregar();
}

loadProducts(products);

//dandole funcionalidad a los botones 

categoryButtons.forEach(button => {

    button.addEventListener("click", (e) => {

        categoryButtons.forEach(button => button.classList.remove("active"));
        e.target.classList.add("active");

        if (e.target.id != "todos") {

            const categoryProduct = products.find(products => products.category.id === e.target.id);
            titlePrincipal.innerText = categoryProduct.category.name;

            const buttonProducts = products.filter(products => products.category.id === e.target.id);
            loadProducts(buttonProducts);
        } else {
            titlePrincipal.innetText = "Todos los productos";
            loadProducts(products);
        }

    })
})

//Agregar productos al carrito

function updateAgregar() {

    buttonAgregar = document.querySelectorAll(".product-button");

    buttonAgregar.forEach(button => {
        button.addEventListener("click", addShop);
    });
}

let productsShop;


let productsShopLS = localStorage.getItem("products-shop");

if (productsShopLS) {
    productsShop = JSON.parse(productsShopLS);
    updateNumber()

} else {
    productsShop = [];
}



function addShop(e) {

    const idButton = e.target.id;
    const productAgregar = products.find(products => products.id === idButton);

    if (productsShop.some(products => products.id === idButton)) {
        const index = productsShop.findIndex(products => products.id === idButton);
        productsShop[index].quality++;

    } else {
        productAgregar.quality = 1;
        productsShop.push(productAgregar);
    }


    updateNumber()

    localStorage.setItem("products-shop", JSON.stringify(productsShop));

}

function updateNumber() {
    let numberTwo = productsShop.reduce((acc, products) => acc + products.quality, 0);
    numberShop.innerText = numberTwo;

}