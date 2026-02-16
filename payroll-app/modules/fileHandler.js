const fs=require('fs').promises;
const path=require('path');
const FILE=path.join(_dirname,'..','employees.json');
async function reademployee(){
    try{
        const data=await fs.readFile(FILE,utf8);
        return JSON.parse(data);
    }
    catch(err){
        console.log("error in reading file",err);
        return [];
    }
}
async function writeemployee(data){
    try{
        await fs.writeFile(FILE,JSON.stringify(data,null,2),utf8);
    }
    catch(err){
        console.log("error writing in file",err);
    }
}
module.exports={reademployee,writeemployee};