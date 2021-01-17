let http=require('http');
let prd=[{ ProductId:1,
           ProductName:"Refrigerator",
           Category:"Electronics",
           Price:120000
    
    }];
    let id=2;
let server=http.createServer((req,res)=>{

    if(req.method=='GET'){
       
        let s = req.url.split('/')[1];
            res.writeHead(200,{'Content-Type': 'application/json'});
            if(s !== 'favicon.ico' && s!== ''){
                
                let output = prd.filter((e,i)=>{
                    return e.ProductId== parseInt(s);
                });
            
                res.write(JSON.stringify(output));
                res.end();
            
            } else {
                res.write(JSON.stringify(prd));
                res.end();
            }

        
    }
   
    
    if(req.method=="POST")
    {
        req.on('data',(d)=>{
            d=JSON.parse(d)
            let productid = "ProductId";
            d[productid] = id;
            id++;
            prd.push(d);
            res.writeHead(200,{'Content-Type':'application/json'})
            res.write(JSON.stringify(prd))
            res.end()
        })
    }
});
server.listen(9999);
console.log('Started on port 9999');