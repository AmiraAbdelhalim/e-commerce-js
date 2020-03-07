const tableBody = document.querySelector('tbody');
const nothingPara = document.querySelector('table + p');
let totalPrice = document.querySelector('#totalPrice').lastChild;

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
        priceCol.innerHTML = '<span>$</span>' + productObj.Price;

        quantityField.setAttribute('type', 'number');
        quantityField.setAttribute('min', '1');
        quantityField.setAttribute('max', productObj.Quantity);
        quantityField.value = 1;

        quantityField.onchange = (ev) => {
            calculateTotal(ev);
        };

        totalCol.innerHTML = '<span>$</span>' + productObj.Price;

        imageCol.append(imageFig);
        nameCol.append(name);
        quantityCol.appendChild(quantityField);

        row.append(imageCol, nameCol, priceCol, quantityCol, totalCol);
        tableBody.append(row);

        totalPrice.data = Number(totalPrice.data) + Number(productObj.Price);
    }
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