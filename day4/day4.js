
class Employee{
   constructor(){
       
    this.m=new Map();
   this.m.set(1, {empNo:101,empName:'Anushri',deptNo:1,designation:'intern',salary:1000});
    this.m.set(2, {empNo:102,empName:'yashi',deptNo:2,designation:'manager',salary:2000});
    this.m.set(3, {empNo:103,empName:'farhan',deptNo:1,designation:'intern',salary:1000});
    this.m.set(4, {empNo:104,empName:'mahesh',deptNo:2,designation:'manager',salary:2000});
    this.m.set(5, {empNo:105,empName:'jay',deptNo:1,designation:'intern',salary:1000});
    //console.log (this.m);
    
   this.m1=new Map();
   this.m1.set(1, {deptNo:1,deptName:'ds',location:"pune",capacity:100});
   this.m1.set(2, {deptNo:2,deptName:'cms',location:"pune",capacity:200});
    console.log("1.addemployee     .....");
    this.addEmployee();
    console.log("2.deleteEmployee     .....");
    this.deleteEmployee();
    console.log("updated employee details are");
    this.updateEmployee();
    console.log("employees with same departmentName are")
    this.fun1();
   }
  addEmployee(){
       
    this.m.set(6, {empNo:106,empName:'xyz',deptNo:2,designation:'intern',salary:1000});
    console.log(this.m);
   }
   deleteEmployee(){
      
       this.m.delete(2);
       console.log(`value deleted is =${this.m.get(2)}`);
   }
   updateEmployee(){
    for(let e of this.m.entries()){
      
         if(e[1].empNo == 101) {
             this.m.set(1, {empNo:101,empName:'Anushri',deptNo:2,designation:'intern',salary:2000});
             console.log(`value of emp Anushri is changed`);
         }
     
     }
    }
     fun1()
     {for(let e of this.m.entries()){
        
         if(e[1].depNo == 1)
         {
            console.log(e[1].empName);
         }
         
     }
    }
    

   

    };
   // console.log(Employee);
   let emp=new Employee;
console.log(emp);
   

