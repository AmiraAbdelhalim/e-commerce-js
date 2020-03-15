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
    // console.log(res.data);
    for (const [key, value] of Object.entries(Category)) {
        let newCategory = document.createElement('a');
        // newCategory.textContent = key + " " + value;
        newCategory.textContent = key;
        newCategory.href = '#';
        newCategory.className = 'dropdown-item';
        // console.log(newCategory);
        categories.appendChild(newCategory);
        newCategory.addEventListener('click',(ev)=>{
          let cat = key;
          $.ajax({
            method:"GET",
            url:`https://afternoon-falls-30227.herokuapp.com/api/v1/products?category=${cat}&limit=${value}`
        })
        .done(function(response){
            const products=response;
            htmlEl(products, true);
        }) 
           
        })
       
      }
     

      for (const [key, value] of Object.entries(Suppliers)) {
        let newSupplier = document.createElement('a');
        // newSupplier.textContent = key + " " + value;
        newSupplier.textContent = key;
        newSupplier.href = '#';
        newSupplier.className = 'dropdown-item';
        // console.log(newCategory);
        supplier.appendChild(newSupplier);
        newSupplier.addEventListener('click',(ev)=>{
          let sup = key;
          console.log(sup);
          
          $.ajax({
            method:"GET",
            url:`https://afternoon-falls-30227.herokuapp.com/api/v1/products?supplier=${sup}&limit=${value}`
        })
        .done(function(response){
            const products=response;
            htmlEl(products, true);
        }) 
           
        })

      }
    
      
};

