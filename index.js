var express = require("express")
var ejs = require("ejs")
var path = require("path")
var bodyParser = require("body-parser")

const app = express();

app.get('/',function(req,res){
    res.render('index');
});
app.get('/record',function(req,res){
    res.render('routes/record');
});
app.get('/record',function(req,res){
    res.render('routes/record');
});
app.get('/details',function(req,res){
    res.render('routes/details');
});
app.get('/about',function(req,res){
    res.render('routes/about');
});
app.get('/reviews',function(req,res){
    res.render('routes/reviews');
});
app.set('views',__dirname);
app.use(express.static(__dirname+'/'));


app.set('view engine','ejs');

app.listen(8000,function(){
    console.log('connected');
});