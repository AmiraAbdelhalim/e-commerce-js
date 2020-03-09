const tableBody = document.querySelector('tbody');
const nothingPara = document.querySelector('table + p');
const checkoutBtn = document.querySelector('#checkout');
const purchaseMsg = document.querySelector('#purchase-msg');
let totalPrice = document.querySelector('#totalPrice').lastChild;

window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

const dbName = 'products';
let dbVersion = 3;
let store;
let db;

if(indexedDB) {
    let request = indexedDB.open(dbName);

    request.onerror = function(event) {
        console.error("Database error: " + event.target.errorCode);
    };

    request.onsuccess = function(event) {
        db = event.target.result;
        store = db.transaction('products', 'readwrite').objectStore('products');
    };

    request.onupgradeneeded = function(event) { 
        // Save the IDBDatabase interface 
        db = event.target.result;
        // console.log(db);

        if(!db.objectStoreNames.contains('products'))
            store = db.createObjectStore('products', {keyPath: 'id', autoIncrement: true});
        else
            store = db.transaction('products', 'readwrite').objectStore('products');
    };
}

if(sessionStorage.length){

    nothingPara.remove();

    for(let i = 0; i < sessionStorage.length; i++) {
        const productName = sessionStorage.key(i);
        const productObj = JSON.parse(sessionStorage.getItem(productName));

        console.log(productObj);

        const row = document.createElement('tr');
        const imageCol = document.createElement('td');
        const nameCol = document.createElement('td');
        const priceCol = document.createElement('td');
        const quantityCol = document.createElement('td');
        const totalCol = document.createElement('td');

        const imageFig = document.createElement('figure');
        const image = document.createElement('img');

        const name = document.createElement('h4');

        const quantityField = document.createElement('input');

        image.setAttribute('src', productObj.ProductPicUrl);
        imageFig.appendChild(image);

        name.textContent = productObj.Name;
        priceCol.innerHTML = '<span>&euro;</span>' + productObj.Price;

        quantityField.setAttribute('type', 'number');
        quantityField.setAttribute('min', '1');
        quantityField.setAttribute('max', productObj.Quantity);
        quantityField.value = 1;

        quantityField.onchange = (ev) => {
            calculateTotal(ev);
        };

        totalCol.innerHTML = '<span>&euro;</span>' + productObj.Price;

        imageCol.append(imageFig);
        nameCol.append(name);
        quantityCol.appendChild(quantityField);

        row.append(imageCol, nameCol, priceCol, quantityCol, totalCol);
        tableBody.append(row);

        totalPrice.data = Number(totalPrice.data) + Number(productObj.Price);
    }
}

checkoutBtn.onclick = (ev) => {

    store = db.transaction('products', 'readwrite').objectStore('products');
    let quantityOrdered = 0;

    const rows = ev.path[3].children[0].tBodies[0].children;

    for(let i = 0; i < rows.length; i++) {
        let quantityVal = rows[i].cells[3].children[0].value;
        quantityOrdered += (+quantityVal);
    }

    // for(let i = 0; i < sessionStorage.length; i++) {
        // const name = sessionStorage.key(i);
        // const product = JSON.parse(sessionStorage.getItem(name));
    let date = new Date();
    let res = store.add({totalPrice: totalPrice.data, totalQuantity: quantityOrdered, date: date.toDateString()});

    res.onsuccess = () => {
        purchaseMsg.style.color = 'green';
        purchaseMsg.style.paddingTop = '1rem';
        purchaseMsg.textContent = 'Thanks for purchasing';
        sessionStorage.clear();
    }

    res.onerror = () => {
        purchaseMsg.style.color = 'red';
        purchaseMsg.style.paddingTop = '1rem';
        purchaseMsg.textContent = 'Purchase was unsuccessful';
    }

    // }
}

function calculateTotal(ev) {
    const totalField = ev.path[2].lastElementChild.lastChild;
    const price = ev.path[2].children[2].lastChild.data;
    const quantity = ev.target.value;
    const rows = Array.from(ev.path[3].rows);

    // console.log(ev)

    const newTotal = quantity * Number(price);

    totalField.data = newTotal;

    totalPrice.data = 0;

    rows.forEach(row => {
        // console.log(row.lastChild)
        totalPrice.data = Number(totalPrice.data) + Number(row.lastChild.lastChild.data);
    });

    // console.log(ev);
}