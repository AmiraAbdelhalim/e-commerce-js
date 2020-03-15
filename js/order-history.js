const DB_NAME = 'products';
const DB_V = 1;
const order_number = document.querySelector('order_number');
const date = document.querySelector('date');
const total = document.querySelector('total');
let dataTable = document.getElementById('dataTable');

let db;



if ('indexedDB' in window) {
    openDB();
    
}

function openDB() {
    
    const dbReq = indexedDB.open(DB_NAME, DB_V);
    
    dbReq.onerror = (ev) => {
        console.error('Databsae error: ', ev.target.errorCode);
        
    };


    dbReq.onsuccess = (ev) => {
        console.log("hi");
        db = ev.target.result;
        store = db.transaction('products').objectStore('products');
        store.getAll().onsuccess = function(event) {
            let history;
            history = event.target.result;

            for (let i = 0 ; i < history.length ; i++ ){

                let newRow = document.createElement("tr");
                let newCell1 = document.createElement("td");
                let newCell2 = document.createElement("td");
                let newCell3 = document.createElement("td");

                newCell1.innerHTML = "# "+history[i].id;
                newRow.appendChild(newCell1);
                newCell2.innerHTML = history[i].date;
                newRow.appendChild(newCell2);
                newCell3.innerHTML = "<span>&euro; "+history[i].totalPrice +" for "+history[i].totalQuantity + " items </span>";
                newRow.appendChild(newCell3);
                dataTable.appendChild(newRow);
                console.log(history[i]);
            }
            
        };
        
        
    };
}
