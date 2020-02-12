var express = require("express")
var ejs = require("ejs")
var path = require("path")
var bodyParser = require("body-parser")
var mysql = require("mysql")
var localStorage = require('localStorage')

const app = express();
const connection = mysql.createConnection({
    host: "localhost",
    username: "root",
    password: "",
    database:"canteen"
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.get('/admin',function(req,res){
    res.render('index');
});
app.get('/',function(req,res){
    res.render('routes/login');
});
app.get('/login',function(req,res){
    res.render('routes/login');
});
app.get('/register',function(req,res){
    res.render('routes/register');
});

app.get('/cart',(req,res)=>{
    var user_rid = localStorage.getItem('uid');
    var sql1 ="SELECT * FROM `canteen_records` WHERE `cart`<>0 AND `uid`="+user_rid
    connection.query(sql1,(err,results,fields)=>{
        if(err){
            console.log(err);
        }else{
            console.log(results);
            res.render('routes/cart',{cart:results});
        }
    })
});
app.get('/add-to-cart/:id',(req,res)=>{
    var user_rid = localStorage.getItem('uid');
    var id = req.params.id; 
    var sql1 ="UPDATE `canteen_records` SET `uid`="+user_rid+",`cart`=1 WHERE `record_rid`="+id;
    connection.query(sql1,(err,results,fields)=>{
        if(err){
            console.log(err);
        }else{
            console.log(results);
           
        }
    });
    return res.redirect('/menu');
});

app.get('/cancel/:id',(req,res)=>{
    var id=req.params.id;
    console.log(id);
    var sql1="UPDATE `canteen_records` SET `uid`=0,`cart`=0 WHERE `record_rid`="+id;
    connection.query(sql1,(err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("Removed");
        }
    });
    return res.redirect('/cart');
});
app.get('/menu',function(req,res){
    connection.query("SELECT * FROM `canteen_records`",(err,results,fields)=>{
        if(err){
            console.log(err);
        }else{
            res.render('routes/orders',{food:results});
        }
    });
        
});
app.get('/record',function(req,res){
    res.render('routes/record');
});

app.get('/feedback',(req,res)=>{
    res.render('routes/feedback');
});

app.get('/feedbacks',(req,res)=>{
    var sql = "SELECT * FROM `feedback`";
    connection.query(sql,(err,results,fields)=>{
        if(err){
            console.log(err);
        }else{
            res.render('routes/feedback-detail',{feedback:results});
        }
    })
    
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
app.post('/register',(req,res)=>{
    var email = req.body.email;
    var password = req.body.password;
    var cpassword = req.body.cpassword;
    var sql = "INSERT INTO login(`user`,`password`) VALUES('"+email+"','"+password+"')";
    if(password.length>5 && cpassword == password){
                connection.query(sql,function(err)
                {
                    if(!err){
                        console.log("Inserted");
                      
                        
                    }else{
                        throw err;
                    }
                    
                });
    
                var sql1 = "SELECT uid FROM login WHERE `user`="+email; 
                connection.query(sql1,function(err,results,fields)
                {
                    if(!err){
                        //console.log("Inserted");
                        console.log(results[0].uid);
                        localStorage.setItem('uid', results[0].uid);
                        myValue = localStorage.getItem('uid');
                        console.log(myValue);
                        
                    }else{
                        throw err;
                    }
                    
                });     
    
        return res.redirect('/menu');
    }
});
app.post('/login',function(req,res){
    var email = req.body.email;
    var password = req.body.password;
    var sql = "SELECT * FROM login WHERE user='"+email+"'";
    connection.query(sql,function(err,results,fields){
        if(err){
            throw err;
        }
        else{
            console.log("The solution is : ",results);
            if(results.length > 0){
                if(results[0].password == password){
                    var sql1 = "SELECT uid FROM login WHERE `email`="+email; 
                    connection.query(sql,function(err,results,fields)
                    {
                        if(!err){
                            //console.log("Inserted");
                            console.log(results[0].uid);
                            localStorage.setItem('uid', results[0].uid);
                            myValue = localStorage.getItem('uid');
                            console.log(myValue);
                            
                        }else{
                            throw err;
                        }
                        
                    });   
                    return res.redirect('/menu');
                }
                else{
                    res.send("Email and password doesnt match");
                }
            }
            else{
                res.send("Email doesnt exist");
            }
        }
    });
   
    
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

app.post('/feedback',(req,res)=>{
   // var rating = req.body.rating;
    var subject = req.body.subject;
    var description = req.body.description;
    var uid =  localStorage.getItem('uid');
    var sql = "INSERT INTO `feedback` VALUES('"+subject+"','"+description+"',"+uid+")";
    connection.query(sql,(err)=>{
        if(err){
            console.log(err);
        }else{
            console.log('Inserted');
        }
    });
    return res.redirect('/feedback');
});

app.post('/update/:id',(req,res)=>{
    console.log(req.params.id);
    var food=req.body.food;
    var additional_food = req.body.additional_food;
   
    var cost = req.body.cost;
    var image =req.body.image;
    var id = req.params.id;
    console.log(image);
    var sql = "UPDATE `canteen_records` SET `food_item`='"+food+"',`additional_food_item`='"+additional_food+"',`cost`="+cost+",`food_file`='"+image+"' WHERE `record_rid`="+id;
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
    //var paid = req.body.paid;
    var cost = req.body.cost;
    var image = req.body.image;
    var sql = "INSERT INTO `canteen_records`(`food_item`,`additional_food_item`,`cost`,`food_file`) VALUES('"+
    food+"','"+additional_food+"',"+cost+"'"+image+"'"+")";
    connection.query(sql,(err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("Insert");
        }
    });
    return res.redirect("/details");
});
app.post('/admin-login',(req,res)=>{
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