let req = new XMLHttpRequest();

req.open('GET', ' https://afternoon-falls-30227.herokuapp.com/api/v1/products-stats/');
req.send();
req.onlaod = function() {
    var res =JSON.parse(this.response);
    console.log(res);  
};

