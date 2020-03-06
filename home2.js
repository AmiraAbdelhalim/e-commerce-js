const div=document.querySelector("#section");
const nextBtn=document.querySelector('#nextBtn')
const prevBtn=document.querySelector('#preBtn')
const row = document.createElement("div");
row.className='row';
let count=1;
function htmlEl(products){
    // const products=response.data;//array of products
    console.log(products.length);
    for (let i=0; i< products.length; i++){
        
        
        const col=document.createElement("div");
        col.className='col-md-6';
        const img=document.createElement("img");
        const curruncyCode=document.createElement("span");
        const price=document.createElement("p");
        const name=document.createElement("p");
        const cartBtn=document.createElement("button");
        name.textContent=products[i].Name;
        img.setAttribute("src",products[i].ProductPicUrl);
        curruncyCode.textContent=products[i].CurrencyCode;
        price.textContent=products[i].Price;
        cartBtn.className='fa fa-shopping-cart';
        price.appendChild(curruncyCode);

        col.appendChild(name);
        col.appendChild(img);
        col.appendChild(price);
        col.appendChild(cartBtn)
        row.appendChild(col);
        
        div.appendChild(row);
        // document.body.appendChild(div);
    }
}


$.ajax({
    method:"GET",
    url:"https://afternoon-falls-30227.herokuapp.com/api/v1/products"
})
.done(function(response){
    console.log(response);
    
    const products=response.data;
    console.log(products);
    
    htmlEl(products);
})           

function getNextPage(){
    div.innerHTML="";
    row.innerHTML="";
    count++;
    $.ajax({
        method:"GET",
        url:`https://afternoon-falls-30227.herokuapp.com/api/v1/products?page=${count}`
    })
    .done(function(response){
        console.log(response);
        
        const products=response.data;
        console.log(products);
        
        htmlEl(products);
    }) 
}

function getPrevPage(){
    div.innerHTML="";
    row.innerHTML="";
    count--;
    $.ajax({
        method:"GET",
        url:`https://afternoon-falls-30227.herokuapp.com/api/v1/products?page=${count}`
    })
    .done(function(response){
        console.log(response);
        
        const products=response.data;
        console.log(products);
        
        htmlEl(products);
    }) 
}

nextBtn.addEventListener("click", (e)=>getNextPage());
prevBtn.addEventListener("click", (e)=>getPrevPage());
