const express = require('express');
const bodyParser =  require('body-parser');
const cors = require('cors');
const path = require('path');
const { Sequelize, Model, DataTypes } = require('sequelize');
let instance = express();
instance.use(bodyParser.json());
instance.use(bodyParser.urlencoded({ extended: false }));
instance.use(cors({
    origin: "*", // all origins
    methods: "*", // all http methods
    allowedHeaders: "*" // all headers in HTTP request
}));



const sequelize = new Sequelize("Company", "root", "anushri123", {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    define: {
        timestamps: false 
    }
});

async function getTax(){
             
    let r = await sequelize.query(`SELECT EmpNo,EmpName,Salary,if(Salary>=500000,salary*0.30,if(Salary>=200000,Salary*0.20,Salary*0.10)) as tax FROM employee;`);
    console.log(`Result of Tax is ${JSON.stringify(r)}`);
    return r;
}

getTax().then((r)=>{console.log(JSON.stringify(r));}).catch((e)=>{
    console.log(`error ${e}`);
}); 
async function getDepartments(){
     
        let r = await sequelize.query('CALL getEmployees("Manager");');
        console.log(`Result is ${JSON.stringify(r)}`);
        return r;
} 
getDepartments().then((r)=>{console.log(JSON.stringify(r));}).catch((e)=>{
    console.log(`error ${e}`);
});


async function insertDepartent(){
    let r = await sequelize.query("CALL sp_insertdept(101, 'Transport', 'Pune', 30);");
        console.log(`Result is ${JSON.stringify(r)}`);
        return r;
}
insertDepartent().then((r)=>{console.log(JSON.stringify(r));}).catch((e)=>{
    console.log(`error ${e}`);
});





const dept = require(path.join(__dirname,'./models/department'))(sequelize, Sequelize.DataTypes);
const emp = require(path.join(__dirname, './models/employee'))(sequelize, Sequelize.DataTypes);




instance.get('/api/employee', (req, resp) => {
    //let id = parseInt(req.params.id);
    sequelize.sync({
            force: false 
        })
        .then(() =>
            emp.findAll()
        )
        .then((data) => {
            resp.json({ stausCode: 200, rowCount: data.length, response: data });
            resp.end();
        })
        .catch((error) => resp.send({ statusCode: 500, data: error }));
});


instance.get('/api/employee/:id', (req, resp) => {
    let id = parseInt(req.params.id);
    sequelize.sync({
            force: false 
        })
        .then(() =>
            emp.findOne({ where: { EmpNo: id } })
        )
        .then((data) => {
            resp.json({ statusCode: 200, data: data })
            resp.end();
        })
        .catch((error) => resp.send({ statusCode: 500, data: error }));
});

instance.post('/api/employee', (req, resp) => {
    let emp1 = {
        EmpNo: parseInt(req.body.EmpNo),
        EmpName: req.body.EmpName,
        Designation: req.body.Designation,
        Salary: parseInt(req.body.Salary),
        DeptNo: parseInt(req.body.DeptNo)
    };
    console.log(JSON.stringify(emp1));
    sequelize.sync({
            force: false 
        })
        .then(() => {
            return emp.create(emp1);
        })
        .then((data) => {
            resp.json({ statusCode: 200, data: data.toJSON() })
            resp.end();
        })
        .catch((error) => resp.send({ statusCode: 500, data: error }));
});

instance.put('/api/employee/:id', (req, resp) => {
    let id = req.params.id;
    sequelize.sync({
            force: false 
        })
        .then(() =>
            emp.update({
             
                EmpName: req.body.EmpName,
                Designation: req.body.Designation,
                Salary: parseInt(req.body.Salary),
                DeptNo: parseInt(req.body.DeptNo)
            }, { where: { EmpNo: id } })
        )
        .then((data) => {
            resp.json({ statusCode: 200, data: data });
            resp.end();
            
        }).catch((error) => resp.send({ statusCode: 500, data: `Error in Update ${error}` }));
});


instance.delete('/api/employee/:id', (req, resp) => {
    let id = req.params.id;
    sequelize.sync({
            force: false 
        })
        .then(() =>
            emp.destroy({ where: { EmpNo: id } })
        )
        .then((data) => {
            resp.json({ statusCode: 200, data: data })
            resp.end();
           
        })
        .catch((error) => resp.send({ statusCode: 500, data: `Error in Delete ${error}` }));
       
});
instance.listen(6060, () => {
    console.log('Express Server Started on port 6060');
});
