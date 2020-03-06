const div=document.querySelector("#section");
const xhr= new XMLHttpRequest();
xhr.open('GET', 'https://afternoon-falls-30227.herokuapp.com/api/v1/products?page=1');
xhr.send();

xhr.onload= function(){
    const response=JSON.parse(xhr.response);
    // console.log(response.data);
    const products=response.data;//array of products
    const row = document.createElement("div");
    row.className='row';
    for (let i=0; i< products.length; i++){
        
        const col=document.createElement("div");
        const img=document.createElement("img");
        const curruncyCode=document.createElement("span");
        const price=document.createElement("p");
        const name=document.createElement("p");
        name.textContent=products[i].Name;
        img.setAttribute("src",products[i].ProductPicUrl);
        curruncyCode.textContent=products[i].CurrencyCode;
        price.textContent=products[i].Price;
        
        price.appendChild(curruncyCode);

        col.appendChild(name);
        col.appendChild(img);
        col.appendChild(price);
        col.className='col-md-6';
        row.appendChild(col);
        
        div.appendChild(row);
        // document.body.appendChild(div);
    }
    
}