let xhr=new XMLHttpRequest();

var urlParams = new URLSearchParams(window.location.search);
var id=urlParams.get('ProductId');

xhr.open('GET',"https://afternoon-falls-30227.herokuapp.com/api/v1/products/"+id);
xhr.send();
xhr.onload=()=>{
    
    let res=JSON.parse(xhr.response);
    res=res.data;
   // console.log(res);
    let b=document.querySelector(".body");
    let divv =document.createElement("div");
  
    let div2 =document.createElement("div");
    let divv2 =document.createElement("div");
    let div =document.createElement("div");
    let divv3 =document.createElement("div");
    let imageDiv = document.createElement('figure');
    imageDiv.classList.add('m-auto');
    let btn=document.createElement("button");
    let i=document.createElement("i");
    let h2_name=document.createElement("h2");
    let h5_price=document.createElement("h5");
    let p_quantity=document.createElement("p");
    let p_discription=document.createElement("p");
    let p_category=document.createElement("p");

  
    for (const property in res) {
        //let p =document.createElement("p");
        if(property=="Name"){
            
            h2_name.textContent=res[property];

        }else if(property=="Price"){
            //divv3.appendChild(p);

            h5_price.setAttribute("class","text-secondary");
            h5_price.textContent=res[property]+"$"+"\n";
        }else if(property=="Quantity"){
            //divv3.appendChild(p);
            p_quantity.setAttribute("class","text-secondary my-auto");
            p_quantity.textContent=property + "\n"+res[property];


        }else if(property=="Description"){
           // divv3.appendChild(p);
           p_discription.textContent=res[property];     
        }else if(property=="Category"){
            p_category.textContent=res[property]; 
        }
    }
    let image=document.createElement("img");
    
    
    b.appendChild(div);
    // b.appendChild(div); 
    div.appendChild(div2);
   
    div2.appendChild(divv2);
    div2.appendChild(divv);
    div2.appendChild(divv3);
    imageDiv.appendChild(image);
    divv2.appendChild(imageDiv);
    divv3.appendChild(h2_name);
    divv3.appendChild(h5_price);
    divv3.appendChild(p_discription);
    divv3.appendChild(p_category);
    divv3.appendChild(p_quantity);

    divv3.appendChild(btn);
    // div.appendChild(btn);
    btn.appendChild(i);


    h2_name.setAttribute("class","mt-3");
    h5_price.setAttribute("class","mt-3");
    p_category.setAttribute("class","mt-3");
    p_discription.setAttribute("class","mt-3");
    p_quantity.setAttribute("class","mt-3");


    div.setAttribute("class","container");
    div2.setAttribute("class","row align-items-stretch");
  
   
    divv2.setAttribute("class","col-md-6 card image-card");
    // divv.setAttribute("class","col-md-6 my-auto");
    divv3.setAttribute("class","col-md-6 pl-5");
    
    image.setAttribute("src",res.ProductPicUrl);
    btn.innerHTML="<i class='fa fa-shopping-cart'></i>";
    // btn.textContent="card";
    btn.addEventListener("click",(ev)=>{
        sessionStorage.setItem(sessionStorage.length,JSON.stringify(res));
    })


    
    
    

}