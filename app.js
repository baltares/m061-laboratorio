// DEFINING VARIABLES
const TAX_TYPE = {
    REGULAR: 21,
    LOWER: 4,
    EXEMPT: 0
};
Object.freeze(TAX_TYPE);

const PRODUCTS = [
    {
        description: "Goma de borrar",
        price: 0.25,
        tax: TAX_TYPE.LOWER,
        stock: 2,
        units: 0,
    },
    {
        description: "Lápiz H2",
        price: 0.4,
        tax: TAX_TYPE.LOWER,
        stock: 5,
        units: 0,
    },
    {
        description: "Cinta rotular",
        price: 9.3,
        tax: TAX_TYPE.REGULAR,
        stock: 2,
        units: 0,
    },
    {
        description: "Papelera plástico",
        price: 2.75,
        tax: TAX_TYPE.REGULAR,
        stock: 5,
        units: 0,
    },
    {
        description: "Escuadra",
        price: 8.4,
        tax: TAX_TYPE.REGULAR,
        stock: 3,
        units: 0,
    },
    {
        description: "Pizarra blanca",
        price: 5.95,
        tax: TAX_TYPE.REGULAR,
        stock: 2,
        units: 0,
    },
    {
        description: "Afilador",
        price: 1.2,
        tax: TAX_TYPE.LOWER,
        stock: 10,
        units: 0,
    },
    {
        description: "Libro ABC",
        price: 19,
        tax: TAX_TYPE.EXEMPT,
        stock: 2,
        units: 0,
    },
];


// LOADING PRODUCTS
document.getElementById("button-calculate").disabled = true;
let productsList = document.getElementById("products-list");

PRODUCTS.forEach((product,index) => {
    //Define product row
    let productRow = document.createElement("li");
    productRow.setAttribute("class", "product-row");
    productRow.setAttribute("id", "product"+index);

    //Define elements inside product row
    let productName = document.createElement("span");
    productName.setAttribute("class", "product-name");
    productName.innerHTML = product.description+" - "+product.price+"€/ud.";

    let productInput = document.createElement("input");
    productInput.setAttribute("class", "product-unit");
    productInput.setAttribute("id", "input"+index);
    productInput.setAttribute("type", "number");
    productInput.setAttribute("value", 0);
    productInput.setAttribute("step", 1);
    productInput.setAttribute("min", 0);
    productInput.setAttribute("max", product.stock);
    productInput.addEventListener("change", () => {
        (productInput.value == 0)?
        document.getElementById("button-calculate").disabled = true :
        document.getElementById("button-calculate").disabled = false; 
    });

    //Add elements to product row
    productRow.appendChild(productName);
    productRow.appendChild(productInput);

    //Add product row to product list
    productsList.appendChild(productRow);

    //Check stock
    showNoStock(product,index);
}); 

// CALCULATING TOTALS
let buttonCalculate = document.getElementById("button-calculate");
buttonCalculate.addEventListener("click", () => {
    let productNoIva = 0;
    let subtotal = 0;
    let iva = 0;
    let total = 0;
    PRODUCTS.forEach((product,index) => {
        let quantity = document.getElementById("input"+index).value;
        product.stock -= quantity;
        showNoStock(product,index);
        productNoIva = product.price * quantity;
        subtotal += productNoIva;
        iva += productNoIva * product.tax/100; 
        document.getElementById("input"+index).value = 0;
    });
    total = subtotal + iva;
    console.log(subtotal+" "+iva+" "+total);
    document.getElementById("subtotal").getElementsByClassName("quantity")[0].innerHTML = Math.round(subtotal * 100) / 100;
    document.getElementById("iva").getElementsByClassName("quantity")[0].innerHTML = Math.round(iva * 100) / 100;
    document.getElementById("total").getElementsByClassName("quantity")[0].innerHTML = Math.round(total * 100) / 100;
    document.getElementById("button-calculate").disabled = true;
});

// Function to show no stock
function showNoStock(product,index) {
    if(product.stock == 0) document.getElementById("input"+index).classList.add("border-color-red"); 
}

