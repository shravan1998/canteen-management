var express = require("express")
var ejs = require("ejs")
var path = require("path")
var bodyParser = require("body-parser")
var mysql = require("mysql")

const app = express();
const connection = mysql.createConnection({
    host: "localhost",
    username: "root",
    password: "",
    database:"canteen"
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.get('/',function(req,res){
    res.render('index');
});
app.get('/record',function(req,res){
    res.render('routes/record');
});

app.get('/details',function(req,res){
    sql = "SELECT * FROM `canteen_records`";
    connection.query(sql,(err,results,fields)=>{
        if(err){
            console.log(err);
        }else{
            res.render('routes/details',{records:results});
        }
    });
    
});
app.get('/about',function(req,res){
    res.render('routes/about');
});

app.get('/update/:id',(req,res)=>{
    var id = req.params.id;
    var sql = "SELECT * FROM `canteen_records` WHERE `record_rid`="+id;
    connection.query(sql,(err,results,fields)=>{
        if(err){
            console.log(err);
        }else{
            res.render('routes/update',{records:results[0]})
        }
    });
});

app.post('/update/:id',(req,res)=>{
    console.log(req.params.id);
    var food=req.body.food;
    var additional_food = req.body.additional_food;
    var paid = req.body.paid;
    var cost = req.body.cost;
    var pending = req.body.pending;
    var id = req.params.id;
    var sql = "UPDATE `canteen_records` SET `food_item`='"+food+"',`additional_food_item`='"+additional_food+"',`paid`='"+paid+
    "',`cost`="+cost+",`pending_cost`="+pending+" WHERE `record_rid`="+id;
    connection.query(sql,(err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("Updated");
        }
    });
    return res.redirect("/details");
});

app.get('/delete/:id',(req,res)=>{
    var id = req.params.id;
    var sql = "DELETE FROM `canteen_records` WHERE `record_rid`="+id;
    connection.query(sql,(err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("Deleted");
        }
    });
    return res.redirect("/details");
});

app.post('/record',(req,res)=>{
    var food=req.body.food;
    var additional_food = req.body.additional_food;
    var paid = req.body.paid;
    var cost = req.body.cost;
    var pending = req.body.pending;
    var sql = "INSERT INTO `canteen_records`(`food_item`,`additional_food_item`,`paid`,`cost`,`pending_cost`) VALUES('"+
    food+"','"+additional_food+"','"+paid+"',"+cost+","+pending+")";
    connection.query(sql,(err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("Insert");
        }
    });
    return res.redirect("/details");
});
app.post('/login',(req,res)=>{
    var admin = req.body.admin;
    var sql = "SELECT * FROM login WHERE `user`='"+admin+"'";
    connection.query(sql,function(err,results,fields){
        if(err){
            throw err;
        }
        else{
            console.log("The solution is : ",results);
            
                
                    
                    
                }
               
            });
            return res.redirect('/record');
        
 
});
app.set('views',__dirname);
app.use(express.static(__dirname+'/'));


app.set('view engine','ejs');

app.listen(8000,function(){
    console.log('connected');
});