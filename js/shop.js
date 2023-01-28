//traer informacion del local Storage

let productsShop = localStorage.getItem("products-shop");
productsShop = JSON.parse(productsShop);


const shopEmpty = document.querySelector("#shop-empty");
const productsShopContainer = document.querySelector("#products-shop-container");
const shopAsk = document.querySelector("#shop-ask");
const shopBuyNew = document.querySelector("#shop-buy-new");
let removeButton = document.querySelectorAll(".shop-remove");
const buttonVaciarCarrito = document.querySelector("#shop-ask-empty");
const containerTotal = document.querySelector("#total");
const buttonFinalizarCompra = document.querySelector ("#shop-ask-buy");




function loadShop() {
    if (productsShop && productsShop.length > 0) {


        shopEmpty.classList.add("disabled");
        productsShopContainer.classList.remove("disabled");
        shopAsk.classList.remove("disabled");
        shopBuyNew.classList.add("disabled");

        productsShopContainer.innerHTML = "";


        productsShop.forEach(products => {

            const div = document.createElement("div");
            div.classList.add("product-shop");
            div.innerHTML = `
            <img class="shop-img" src="${products.image}" alt="${products.title}">
            <div class="shop-name">
                <small>Producto</small>
                <h3>${products.title}</h3>
    
            </div>
            <div class="shop-quality">
                <small>Cantidad</small>
                <p>${products.quality}</p>
            </div>
            <div class="shop-price">
                <small>Precio</small>
                <p>${products.price}</p>
            </div>
            <div class="shop-subtotal">
                <small>Subtotal</small>
                <p>${products.price * products.quality}</p>
            </div>
            <button id="${products.id}" class="shop-remove">Icono</button>
            `;

            productsShopContainer.append(div);


        })



    } else {

        shopEmpty.classList.remove("disabled");
        productsShopContainer.classList.add("disabled");
        shopAsk.classList.add("disabled");
        shopBuyNew.classList.add("disabled");

    }

    updateVaciar();
    updateTotal();

}

loadShop();




function updateVaciar() {

    removeButton = document.querySelectorAll(".shop-remove");

    removeButton.forEach(button => {
        button.addEventListener("click", removeShop);
    });
}

function removeShop(e) {
    const idButton = e.target.id;
    const index = productsShop.findIndex(products => products.id === idButton);

    productsShop.splice(index, 1);
    loadShop();

    localStorage.setItem("products-shop", JSON.stringify(productsShop));

}

//agregando funcionalidad al boton Vaciar 
buttonVaciarCarrito.addEventListener("click", vaciarShop);


function vaciarShop() {

    productsShop.length = 0;
    localStorage.setItem("products-shop", JSON.stringify(productsShop));
    loadShop()

}

//actualizar total 

function updateTotal() {

    const totalCalculate = productsShop.reduce((acc, products) => acc + (products.price * products.quality), 0);
    total.innerText = `$${totalCalculate}`;

}

buttonFinalizarCompra.addEventListener("click", buyShop);


function buyShop() {

    Swal.fire({
        title: 'Muchas gracias por tu compra!',
        width: 600,
        padding: '3em',
        color: '#8314B8',
        background: '#fff url(/images/trees.png)',
        backdrop: `
          rgba(0,0,123,0.4)
          url("/images/nyan-cat.gif")
          left top
          no-repeat
        `
      })

    productsShop.length = 0;
    localStorage.setItem("products-shop", JSON.stringify(productsShop));

    shopEmpty.classList.add("disabled");
    productsShopContainer.classList.add("disabled");
    shopAsk.classList.add("disabled");
    shopBuyNew.classList.remove("disabled");


}