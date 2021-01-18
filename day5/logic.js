function postData(url,data){
    return new Promise((resolve,reject)=>{
        let request  =new XMLHttpRequest();

        request.onload = function(){
            if(request.status == 201){
                resolve(request.response);
            } else {
                reject(new Error(request.statusText));
            }
        };

        request.onerror = function(){
            reject(new Error('May be Network Error'));
        };
        

        request.open("POST",url); 
       
        request.setRequestHeader("Content-Type", "application/json");
        
        request.send(JSON.stringify(data));

    });
    
}
function deleteData(url){
    return new Promise((resolve,reject)=>{
        let request  =new XMLHttpRequest();

        request.onload = function(){
            if(request.status == 200){
                resolve(request.response);
            } else {
                reject(new Error(request.statusText));
            }
        };

        request.onerror = function(){
            reject(new Error('May be Network Error'));
        };


        request.open("DELETE",url); 
        request.send(JSON.stringify(null));

    });
    
}
function putData(url,data){
    return new Promise((resolve,reject)=>{
        let request  =new XMLHttpRequest();

        request.onload = function(){
             if(request.status == 204){
                resolve(request.response);
             } else {
                reject(new Error(request.statusText));
             }
        };

        request.onerror = function(){
            reject(new Error('May be Network Error'));
        };


        request.open("PUT",url); 
        request.setRequestHeader("Content-Type", "application/json");
        
        request.send(JSON.stringify(data));

    });
    
}


let prdData = {
    ProductId: 'Prd998',
    ProductName: 'Pen',
    CategoryName: 'Stationary',
    Manufacturer: 'Renolds',
    Description: 'Gel-Pen',
    BasePrice:40
};
let prdData1 = {
    ProductRowId:61,
    ProductId: 'Prd999',
    ProductName: 'Pen',
    CategoryName: 'Stationary',
    Manufacturer: 'Renolds',
    Description: 'Gel-Pen',
    BasePrice:40
};


function post1(){
postData("https://apiapptrainingnewapp.azurewebsites.net/api/Products", prdData)
.then((resp)=>{
    console.log(`Data post successfull ${resp}`);
})
.catch((error)=>{
    console.log(`Data Creation failed ${error}`);
});}
function put1(){
putData("https://apiapptrainingnewapp.azurewebsites.net/api/Products/61",prdData1)
.then((resp)=>{
    console.log(`Data updated successfully ${resp}`);
})
.catch((error)=>{
    console.log(`Data updation failed ${error}`);
});}
function delete1(){
deleteData("https://apiapptrainingnewapp.azurewebsites.net/api/Products/94")
.then((resp)=>{
    console.log(`Data deleted successfully ${resp}`);
})
.catch((error)=>{
    console.log(`Data deletion failed ${error}`);
});}
function getProducts(){

    return new Promise((resolve,reject)=> {
        let xhr = new XMLHttpRequest();
    
        
        xhr.onload = function(){
            
            if(xhr.status== 200) {
                console.log(`In onload ${xhr.response}`);
               
                resolve(xhr.response); 
            } else {
                
                reject('Some Error Occured with the status code');
            }
        };
    
        // failure
        xhr.onerror = function(){
             // reject if there is different status code
             reject('Some Error Occured with Http Communication');
        };
    
        // initiate the request
        xhr.open("GET", "https://apiapptrainingnewapp.azurewebsites.net/api/Products");
        // send the request
        xhr.send();

    });
}


function get1(){
getProducts().then((response)=>{
    console.log(`Received Response ${response}`);
}).catch((error)=>{
    console.log(`Received Error ${error}`);

});}

