/*****PRODUCTOS******/

const products = [
    //Limpiadores
    { id: "limpiador-cerave", title: "Gel limpiador Cerave", image: "./img/limpiadores/cerave-limpiador.jpg", category: { name: "Limpiador", id: "limpiador" }, price: 1900 },
    {
        id: "dermopure-eucerin", title: "Dermopure Eucerin", image: "./img/limpiadores/dermopure-eucerin.png", category: { name: "Limpiador", id: "limpiador" }, price: 4200
    },
    {
        id: "effaclar-larocheposay", title: "Effaclar La Roche Posay", image: "./img/limpiadores/effaclarlimpiador-lrp.jpg", category: { name: "Limpiador", id: "limpiador" }, price: 5600
    },
    {
        id: "lipikar-larocheposay", title: "Lipikar La Roche Posay", image: "./img/limpiadores/lipikar-lrp.jpg", category: { name: "Limpiador", id: "limpiador" }, price: 4800
    },
    //Hidratantes
    {
        id: "hydrance-avene", title: "Hydrance Avene", image: "./img/hidratantes/avene-hydrance.jpg", category: { name: "Hidratante", id: "hidratante" }, price: 8500
    },
    {
        id: "effaclar-mat-lrp", title: "Effaclar Mat LRP", image: "./img/hidratantes/effaclar-mat-lrp.webp", category: { name: "Hidratante", id: "hidratante" }, price: 9200
    },
    {
        id: "toleriane-larocheposay", title: "Toleriane La Roche Posay", image: "./img/hidratantes/toleriane.lrp.jpg", category: { name: "Hidratante", id: "hidratante" }, price: 4600
    },
    //Serums
    {
        id: "serum-vol1-dadatina", title: "Serum vol.1 Dadatina", image: "./img/serums/acfserum-dadatina.webp", category: { name: "Serum", id: "serum" }, price: 2900
    },
    {
        id: "hyalu-b5", title: "Hyalu B5", image: "./img/serums/hyalub5-lrp.webp", category: { name: "Serum", id: "serum" }, price: 11000
    },
    {
        id: "mineral89-vichy", title: "Mineral 89 Vichy", image: "./img/serums/mineral89-vichy.webp", category: { name: "Serum", id: "serum" }, price: 9000
    },
    {
        id: "vitc-lrp", title: "Vit C LRP", image: "./img/serums/vitc-lrp.webp", category: { name: "Serum", id: "serum" }, price: 10500
    },
    //Solares
    {
        id: "anthelios50-lrp", title: "Anthelios 50+ LRP", image: "./img/solares/anthelios-lrp.webp", category: { name: "Solares", id: "solares" }, price: 5480
    },
    {
        id: "fusion-water-isdin", title: "Fusion Water Isdin", image: "./img/solares/fusionwater-isdin.jpg", category: { name: "Solares", id: "solares" }, price: 5490
    },
    {
        id: "eucerin-oil-control", title: "Eucerin Oil Control", image: "./img/solares/oilcontrol-eucerin.webp", category: { name: "Solares", id: "solares" }, price: 4800
    },

]

/******FIN PRODUCTOS*******/


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