// DEFINING VARIABLES
const REGULAR_TYPE = 21;
const LOWER_TYPE = 4;
const EXEMPT_TYPE = 0;

const PRODUCTS = [
    {
        description: "Goma de borrar",
        price: 0.25,
        tax: LOWER_TYPE,
        stock: 2,
        units: 0,
    },
    {
        description: "Lápiz H2",
        price: 0.4,
        tax: LOWER_TYPE,
        stock: 5,
        units: 0,
    },
    {
        description: "Cinta rotular",
        price: 9.3,
        tax: REGULAR_TYPE,
        stock: 2,
        units: 0,
    },
    {
        description: "Papelera plástico",
        price: 2.75,
        tax: REGULAR_TYPE,
        stock: 5,
        units: 0,
    },
    {
        description: "Escuadra",
        price: 8.4,
        tax: REGULAR_TYPE,
        stock: 3,
        units: 0,
    },
    {
        description: "Pizarra blanca",
        price: 5.95,
        tax: REGULAR_TYPE,
        stock: 2,
        units: 0,
    },
    {
        description: "Afilador",
        price: 1.2,
        tax: LOWER_TYPE,
        stock: 10,
        units: 0,
    },
    {
        description: "Libro ABC",
        price: 19,
        tax: EXEMPT_TYPE,
        stock: 2,
        units: 0,
    },
];


// LOADING PRODUCTS
document.getElementById("button-calculate").disabled = true;
let productsList = document.getElementById("products-list");

PRODUCTS.forEach((product, index) => {
    //Define product row
    let productRow = document.createElement("li");
    productRow.setAttribute("class", "product-row");
    productRow.setAttribute("id", "product" + index);

    //Define elements inside product row
    let productName = document.createElement("span");
    productName.setAttribute("class", "product-name");
    productName.innerHTML = product.description + " - " + product.price + "€/ud.";

    let productInput = document.createElement("input");
    productInput.setAttribute("class", "product-unit");
    productInput.setAttribute("id", "input" + index);
    productInput.setAttribute("type", "number");
    productInput.setAttribute("value", 0);
    productInput.setAttribute("step", 1);
    productInput.setAttribute("min", 0);
    productInput.setAttribute("max", product.stock);
    productInput.addEventListener("change", () =>
        document.getElementById("button-calculate").disabled = (productInput.value == 0) ? true : false);

    //Add elements to product row
    productRow.appendChild(productName);
    productRow.appendChild(productInput);

    //Add product row to product list
    productsList.appendChild(productRow);

    //Check stock
    showNoStock(product, productInput);
});

// CALCULATING TOTALS
let buttonCalculate = document.getElementById("button-calculate");
buttonCalculate.addEventListener("click", () => {
    let productNoIva = 0;
    let subtotal = 0;
    let iva = 0;
    let total = 0;
    PRODUCTS.forEach((product, index) => {
        // Product input
        let inputField = document.getElementById("input" + index);
        let quantity = inputField.value;
        product.stock -= quantity;
        showNoStock(product, inputField);
        inputField.setAttribute("max", product.stock);
        // Adding totals
        productNoIva = product.price * quantity;
        subtotal += productNoIva;
        iva += productNoIva * product.tax / 100;
        // Reset input
        document.getElementById("input" + index).value = 0;
    });

    // Print totals
    total = subtotal + iva;
    Object.entries({ subtotal, iva, total }).forEach(([key, value]) => {
        document.getElementById(key).getElementsByClassName("quantity")[0].innerHTML = Math.round(value * 100) / 100;
    });

    // Reset button
    document.getElementById("button-calculate").disabled = true;
});

// Function to show no stock
function showNoStock(product, inputField) {
    if (product.stock == 0) inputField.classList.add("border-color-red");
}
