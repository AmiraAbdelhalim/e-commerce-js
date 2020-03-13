const categories = document.querySelector('#categories');
// const catBtn = document.querySelector('button.cat-btn');
const supplier = document.querySelector('#supplier');
// const supBtn = document.querySelector('button.sup-btn');

let req = new XMLHttpRequest(); 

req.open('GET', ' https://afternoon-falls-30227.herokuapp.com/api/v1/products-stats/');
req.send();
req.onload = function() {
    var res =JSON.parse(this.response);
    let Category = res.data.Groups.Category;
    let Suppliers  = res.data.Groups.SupplierName;
    // console.log(Object.keys(Category)[0]);
    for (const [key, value] of Object.entries(Category)) {
        // console.log(key, value);
        let newCategory = document.createElement('span');
        newCategory.innerHTML = "<a href='# " + "'>" + key + " " + value + "</a>";
        // console.log(newCategory);
        categories.appendChild(newCategory);
        newCategory.addEventListener('click',(ev)=>{
          let cat = key;
          $.ajax({
            method:"GET",
            url:`https://afternoon-falls-30227.herokuapp.com/api/v1/products?category=${cat}`
        })
        .done(function(response){
            const products=response.data;
            htmlEl(products, true);
        }) 
           
        })
       
      }
     

      for (const [key, value] of Object.entries(Suppliers)) {
        // console.log(key, value);
        let newSupplier = document.createElement('span');
        newSupplier.innerHTML = "<a href='# " + "'>" + key + " " + value + "</a>";
        // console.log(newCategory);
        supplier.appendChild(newSupplier);
        newSupplier.addEventListener('click',(ev)=>{
          let sup = key;
          console.log(sup);
          
          $.ajax({
            method:"GET",
            url:`https://afternoon-falls-30227.herokuapp.com/api/v1/products?supplier=${sup}`
        })
        .done(function(response){
            const products=response.data;
            htmlEl(products, true);
        }) 
           
        })

      }
    
      
};

