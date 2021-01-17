import * as http from 'http';
import * as fs from 'fs';

let prd =[];


let server = http.createServer((req,resp) => {

    if(req.method === "POST")
    {
        let receivedData;
        console.log("data posted");

        req.on('data', (d) =>
        {
            receivedData = JSON.parse(d);

            prd.push(receivedData);

            resp.writeHead(201);
           

            console.log(prd);

            

        });
    }

    if(req.url === '/product')
    {
 
        console.log(req.url);

        fs.readFile('./product.html',(error,file) => 
        {

            
            if(error)
            {
                resp.writeHead(404, {'Content-Type': 'text/html'});
                resp.write(error.message);
                resp.end();
            }

            console.log(`File read = ${file}`);
            resp.writeHead(200, {'Content-Type': 'text/html'});
            resp.write(file); 
            resp.end();

        });
    }

    else if(req.url === '/table')
    {
        console.log(req.url);

        fs.readFile('./table.html',(error,file) => 
        {

            
            if(error)
            {
                resp.writeHead(404, {'Content-Type': 'text/html'});
                resp.write(error.message);
                resp.end();
            }

            console.log(`File read = ${file}`);
            resp.writeHead(200, {'Content-Type': 'text/html'});
            resp.write(file); 
            resp.end();

        });
    }
    else if(req.url === '/data')
    {
        console.log("data");

        if(req.method === "GET")
        {
            resp.writeHead(200,{'Content-Type': 'application/json'});
            resp.write(JSON.stringify(prd));
            resp.end();
        }
    }

    

    else
    {
        resp.writeHead(200, {'Content-Type': 'text/html'});
        resp.write("file"); 
        resp.end();
    }
    
    
    
});

server.listen(9087);
console.log(`Listening on port 9087`);