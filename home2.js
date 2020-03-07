const divProducts=document.querySelector("#section");
// const nextBtn=document.querySelector('#nextBtn')
// const prevBtn=document.querySelector('#preBtn')
const continerDiv=document.querySelector("#continer");
const btn=document.querySelector("#btn");
const row = document.createElement("div");
row.className='row';
let count=1;
function htmlEl(products){
    // const products=response.data;//array of products
    // console.log(products.length);
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
        
        divProducts.appendChild(row);
    }
    //buttons create buttons here and the page count
    const nextBtn=document.createElement("button");
    nextBtn.textContent='NEXT';
    nextBtn.className="justify-content-end p-2 btn btn-outline-dark";
    nextBtn.addEventListener("click", (e)=>getNextPage());
    

    const prevBtn=document.createElement("button");
    prevBtn.textContent='PREVIOUS';
    prevBtn.className="justify-content-start p-2 btn btn-outline-dark";
    prevBtn.addEventListener("click", (e)=>getPrevPage());


    const pageNum=document.createElement("p");
    pageNum.textContent="Page: "+count;
    pageNum.className="justify-content-center";

    if (count ===1){
        btn.append( pageNum,nextBtn);
        // console.log(count, nextBtn);
        
    }else if(count ===13){
        btn.append(prevBtn, pageNum);
    }else{
        btn.append(prevBtn,pageNum,nextBtn);
        console.log(count, nextBtn);

    }

}


$.ajax({
    method:"GET",
    url:"https://afternoon-falls-30227.herokuapp.com/api/v1/products"
})
.done(function(response){
    // console.log(response);
    
    const products=response.data;
    // console.log(products);
    
    htmlEl(products);
})           

function getNextPage(){
    divProducts.innerHTML="";
    row.innerHTML="";
    btn.innerHTML="";

    count++;
    $.ajax({
        method:"GET",
        url:`https://afternoon-falls-30227.herokuapp.com/api/v1/products?page=${count}`
    })
    .done(function(response){
        // console.log(response);
        
        const products=response.data;
        // console.log(products);
        
        htmlEl(products);
    }) 
}

function getPrevPage(){
    divProducts.innerHTML="";
    row.innerHTML="";
    btn.innerHTML="";
    count--;
    $.ajax({
        method:"GET",
        url:`https://afternoon-falls-30227.herokuapp.com/api/v1/products?page=${count}`
    })
    .done(function(response){
        // console.log(response);
        
        const products=response.data;
        // console.log(products);
        
        htmlEl(products);
    }) 
}

// prevBtn.addEventListener("click", (e)=>getPrevPage());
