const express=require('express');
const app=express();

const filehandler=require('./modules/fileHandler');
const PORT=5000;
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.get('/',async(req,res)=>{
    const employees=await filehandler.reademployee();
    res.render('index',{employees});
});
app.get('/add',(req,res)=>{
    res.render('add');
});
app.post('/add',async(req,res)=>{
    const {name,department,Basicsalary}=req.body;
    const salary=Number(Basicsalary);
    if(!name|| name.trim()===''||salary<=0){
        return res.status(400).send("Invalid Input,please provide valid details");
    }
    const employees=await filehandler.reademployees();
    const newemployee={
        id:employees.length>0?employees[employees.length-1].id+1:1,
        name:name.trim(),
        department:department.trim(),
        Basicsalary:salary
    };
    employees.push(newemployee);
    await filehandler.writeemployee(employees);
    res.redirect('/');

    
});
app.get('/edit/:id',async(req,res)=>{
    const employees=await filehandler.reademployee();
    const employee=employees.find(emp=>emp.id==req.params.id);
    if(!employee){
        return res.status(404).send("Employees.not found");
    }
    res.render('edit',{employee});
})
app.post('/edit/:id',async(req,res)=>{
    const{name,department,Basicsalary}=req.body;
    const salary=Number(salary);
    if(!name|| name.trim()===''||salary<=0){
        return res.status(400).send("Invalid Input,please provide valid details");
    }
    const employees=await filehandler.readempoyee();
    const index=employees.findIndex(emp=>emp.id==req.params.id);
    if(index!==-1){
        employees[index]={
            id:employees[index].id,
            name:name.trim(),
            Basicsalary:salary
        };
        
    }
    await filehandler.writeemployee(employees);
    res.redirect('/');
    
});
app.get('/delete/:id',async(req,res)=>{
    let employees=await filehandler.reademployee();
    employees=employees.filter(emp=>emp.id!=req.params.id);
    await filehandler.writeemployee(employees);
    res.redirect('/');
});
app.listen(PORT,()=>{
    console.log(`Serveer is running on http://localhost:${PORT}`);
});