const divProducts=document.querySelector("#section");
const continerDiv=document.querySelector("#continer");
const btn=document.querySelector("#btn");
const row = document.createElement("div");//to add each product to a div
row.className='row';//to give it a class
let count=1;//page count
let cartCount=0;//cart count to add it to the key in session storage


//function to render html
function htmlEl(products){
    for (let i=0; i< products.length; i++){//render html to each product
        const col=document.createElement("div");
        col.className='col-md-6';
        const img=document.createElement("img");
        // const curruncyCode=document.createElement("span");
        const price=document.createElement("p");
        const name=document.createElement("p");
        const cartBtn=document.createElement("button");
        name.textContent=products[i].Name;
        img.setAttribute("src",products[i].ProductPicUrl);
        // curruncyCode.innerHTML= '&euro;';
        price.innerHTML='<span>&euro;</span>'+products[i].Price;
        cartBtn.className='fa fa-shopping-cart';
        // price.appendChild(curruncyCode);

        col.appendChild(name);
        col.appendChild(img);
        col.appendChild(price);
        col.appendChild(cartBtn)
        row.appendChild(col);
        
        divProducts.appendChild(row);
        
        cartBtn.addEventListener("click", (e)=>{//adding product to session storage
            console.log(products);
            cartCount++;
            sessionStorage.setItem(cartCount,JSON.stringify(products[i]));
        })
    }

    //adding next , previous button and page number
    const nextBtn=document.createElement("button");
    nextBtn.textContent='NEXT';
    nextBtn.className="btn btn-outline-dark";
    //justify-content-end p-2 
    nextBtn.addEventListener("click", (e)=>getNextPage());
    

    const prevBtn=document.createElement("button");
    prevBtn.textContent='PREVIOUS';
    prevBtn.className=" btn btn-outline-dark";
    //justify-content-start p-2
    prevBtn.addEventListener("click", (e)=>getPrevPage());


    const pageNum=document.createElement("p");
    pageNum.textContent="Page: "+count;
    // pageNum.className="justify-content-center";

    //check whether to show next , previous or both
    if (count ===1){
        btn.append( pageNum,nextBtn);  
    }else if(count ===13){
        btn.append(prevBtn, pageNum);
    }else{
        btn.append(prevBtn,pageNum,nextBtn);
    }

}

//rendering the first page
$.ajax({
    method:"GET",
    url:"https://afternoon-falls-30227.herokuapp.com/api/v1/products"
})
.done(function(response){
    const products=response.data;
    htmlEl(products);
})           


//to get the next page
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



//previous page
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
        const products=response.data;
        htmlEl(products);
    }) 
}
