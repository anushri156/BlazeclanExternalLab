let express  =require('express');

let atob = require('atob');


let bodyParser = require('body-parser');


let cors = require('cors');

let instance = express();


instance.use(bodyParser.urlencoded({extended:false}));

instance.use(bodyParser.json());


instance.use(cors({
    origin: "*", 
    methods: "*", 
    allowedHeaders: "*" 
}));

let credentials = [
    
    {username:"anushri",password:"anushri"},
    {username:"saxena",password:"saxena"}
]; 


let employees = [
    {EmpNo:101, EmpName: 'Mahesh', DeptName: 'IT'},
    {EmpNo:102, EmpName: 'Vikram', DeptName: 'HRD'},
    {EmpNo:103, EmpName: 'Suprotim', DeptName: 'SALES'}
];


instance.get("/api/employees", (req,resp)=>{
    
    let authValues = req.headers.authorization;
    let credValues =  authValues.split(' ');
   
    console.log(credValues[0]    + '   ' + credValues[1]);
    console.log(credValues[1]);

    console.log(atob(credValues[1])); 
    
    let data = atob(credValues[1]).split(':');
    let flag=0;
    
    for(let i=0;i<credentials.length;i++){
    if(data[0].trim() === credentials[i].username && data[1].trim() === credentials[i].password){
       
        flag=1;
       break;
    }}

     if(flag==1)  {
        resp.status(200).send(employees);
     }
   
    {
    resp.status(401).send(`Sorry !!! Credentials are not matched`);
    }


});



instance.get("/api/employees/:id",(req,resp)=>{
 // read the URL parameter
 let id = req.params.id;    

 // search the record based on id
 let authValues = req.headers.authorization;
 let credValues =  authValues.split(' ');

 console.log(credValues[0]    + '   ' + credValues[1]);
 console.log(credValues[1]);

 console.log(atob(credValues[1])); 
 
 let data = atob(credValues[1]).split(':');
 let flag=0;
 
 for(let i=0;i<credentials.length;i++){
 if(data[0].trim() === credentials[i].username && data[1].trim() === credentials[i].password){
    
     flag=1;
    break;
 }}

  if(flag==1)  {

 let emp = employees.filter((e,idx)=>{
     return e.EmpNo == parseInt(id);
 
 }); 

  if(emp.length == 0) {
      resp.status(404).send(`Requested EmpNo ${id} is not available`);
  } 
  resp.status(200).send(emp[0]);
}
else
{
resp.status(401).send(`Sorry !!! Credentials are not matched`);
}

});



// the post request
instance.post("/api/employees", (req,resp)=> {
    
    let authValues = req.headers.authorization;
    let credValues =  authValues.split(' ');
   
    console.log(credValues[0]    + '   ' + credValues[1]);
    console.log(credValues[1]);

    console.log(atob(credValues[1])); 
    
    let data = atob(credValues[1]).split(':');
    let flag=0;
    
    for(let i=0;i<credentials.length;i++){
    if(data[0].trim() === credentials[i].username && data[1].trim() === credentials[i].password){
       
        flag=1;
       break;
    }}

     if(flag==1)  {
    let emp = {
        EmpNo:req.body.EmpNo,
        EmpName: req.body.EmpName, 
        DeptName: req.body.DeptName
    };
    console.log(JSON.stringify(emp));
    // process the data
    employees.push(emp);
    // send the response (success or fail)
    resp.status(200).send(employees);
}
else
    {
    resp.status(401).send(`Sorry !!! Credentials are not matched`);
    }
});

// the put request

instance.put("/api/employees/:id", (req,resp)=> {
    let authValues = req.headers.authorization;
    let credValues =  authValues.split(' ');
   
    console.log(credValues[0]    + '   ' + credValues[1]);
    console.log(credValues[1]);

    console.log(atob(credValues[1])); 
    
    let data = atob(credValues[1]).split(':');
    let flag=0;
    
    for(let i=0;i<credentials.length;i++){
    if(data[0].trim() === credentials[i].username && data[1].trim() === credentials[i].password){
       
        flag=1;
       break;
    }}

     if(flag==1)  {


    let id = req.params.id;

    

    let emp = {
        EmpNo:req.body.EmpNo,
        EmpName: req.body.EmpName, 
        DeptName: req.body.DeptName
    };

    if(id !== emp.EmpNo) {
        resp.status(402).send(`The id = ${id} from URL does not match with data from body EmpNo = ${emp.EmpNo}`);
    }

    

    console.log(JSON.stringify(emp));
    
    employees.push(emp);
    
    resp.status(200).send(employees);
}
    else
    {
    resp.status(401).send(`Sorry !!! Credentials are not matched`);
    }

});

// the delete request

instance.delete("/api/employees/:id", (req,resp)=>{
    let authValues = req.headers.authorization;
    let credValues =  authValues.split(' ');
   
    console.log(credValues[0]    + '   ' + credValues[1]);
    console.log(credValues[1]);

    console.log(atob(credValues[1])); 
    
    let data = atob(credValues[1]).split(':');
    let flag=0;
    
    for(let i=0;i<credentials.length;i++){
    if(data[0].trim() === credentials[i].username && data[1].trim() === credentials[i].password){
       
        flag=1;
       break;
    }}

     if(flag==1)  {
    // read the id from header
    let id = req.params.id;let e=-1;
    for(let i=0; i<employees.length; i++)
    {
        if(employees[i].EmpNo == id)
        {
            let e=i;
            break;
        }
    }
    if(e!=-1)
    employees.splice(0,1);
    else{
    resp.status(402).send(`The id = ${id} from URL does not match with data from body `);
    }
    
     }
    else
    {
    resp.status(401).send(`Sorry !!! Credentials are not matched`);
    }


} );



// start listening

instance.listen(8888, ()=>{
    console.log('REST API is listening on port 8888');
});