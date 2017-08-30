console.log("Using Handlebars");
var express=require('express');
var exphbs=require('express-handlebars');
//var locals=require('locals');
var app=express();
var bodyParser=require('body-parser');
var session = require('express-session');
app.use(express.static('views/images'));

app.engine('handlebars',exphbs({defaultLayout:'main'}));
app.set('view engine','handlebars');
app.use(session({resave: true, saveUninitialized: true, secret: 'SOMERANDOMSECRETHERE', cookie: { maxAge: 60000 }}) );


app.get('/',function(req,res){
var display=require('./displaypromotionfirstpage.js');
display.storefunction(req,res);
var array ;
//function holdArray(arrayOfPromo){y
//console.log("array--"  + arrayOfPromo); 
// arrayofpromotions=arrayOfPromo;
//req.session.arrayofpromotions=arrayofpromotions;
//res.render('first',{arrayofpromotions:arrayofpromotions,layout:false});

//}

});


app.use(function(req, res, next) {
  console.log(")()()()()(---------" + req.session.arrayofpromotions);
  res.locals.arrayofpromotions = req.session.arrayofpromotions;
  console.log(")()()()()(---------" + res.locals.arrayofpromotions);
  next();
});


app.get("/sessions", function(req, res){
  //var session=require('./session');
  ///session.sessionmanagement(req,res);
req.session.fullname = "Nic Raboy";
res.render("sessions", { status: req.session.fullname });
});

app.get("/Noless", function(req, res){
res.render("Noless", { status: req.session.fullname });
});

app.get("/search", function(req, res){
res.render("search", { status: req.session.fullname,layout:false});
});

app.get("/create", function(req, res){

  if (req.session.fullname!=null)
  {
    res.render('create',{Email:req.session.fullname,firstName:'Nayan',lastName:'Patel',layout:false});
 }
  else
 {
     res.render('first',{openloginmodal:"yes",layout:false});
  }

});

app.get("/success", function(req, res){

var vegie=req.param('vegie');
var vegname=req.param('vegname');
console.log("hiii");
var store=require('./storepromotionoracle.js');
store.storefunction(req,res);
//console.log("dfdfdf"+vegie+vegname+req.param('RCP_TYPE_RP_D')+req.param('RCP_TYPE_WPLAN_RP_D'));
res.render("first", { status: req.session.fullname,layout:false});
});

/*app.get("/getpdf", function(req, res){
var promodet=require('./promotiondetails.js');
promodet.promotionDetail(req,res);

res.render("success", { arrayofpromotion:arrayofpromotion,status: req.session.fullname,layout:false});
});*/

app.get("/getexcel", function(req, res){
var promodet=require('./promotiondetails.js');
promodet.promotionDetail(req,res);

res.render("success", { arrayofpromotion:arrayofpromotion,status: req.session.fullname,layout:false});
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.post('/login',function(req,res){

var login=require('./login.js');
login.login(req,res);
});

app.get('/promotiondetails',function(req,res){
var promodet=require('./promotiondetails.js');
promodet.promotionDetail(req,res);
//res.render('first',{layout:false});
//res.render('editpromotion',{arrayofpromotion:arrayofpromotion,layout:false});
});

//app.get('/create',function(req,res){
  //if (req.session.fullname!=null)
  //{
 //   res.render('create',{Email:req.session.fullname,firstName:'Nayan',lastName:'Patel',layout:false});
 // }
//  else
//  {
//    res.render('first',{openloginmodal:"yes",layout:false});
 // }
//});


//app.get('/success',function(req,res) {


//var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb://localhost:27017/mydb";
// inserting record start
//console.log("index inserting");
//var promotionid=req.param('PromotionId');
//var store=require('./storepromotion.js');
//store.storefunction(req,res);
//console.log("index inserting end");

// inserting record end
// retriving multiple record start
//var arrayoffirst;
//MongoClient.connect(url, function(err, db) {
 // if (err) throw err;


 //var query = { PromotionId: promotionid };
 //console.log(query);
  //  db.collection("promotions").find(query).toArray(function(err, result) {
  //  if (err) throw err;
 // arrayofpromotion=result;
   
 //   db.close();
	
	//res.render('search',{layout:false});
	//console.log();
  //});
//});

//});
app.get('/form',function(req,res){


res.render('form',{firstName:'nayan',lastName:'Patel'});
});





app.get('/logout',function(req,res){
req.session.destroy();

res.render('first',{layout:false});
});

app.get('/dataseeding',function(req,res){
req.session.destroy();

res.render('dataseeding',{layout:false});
});

app.get('/updatepromotion',function(req,res){
var updatedetails=require('./promotiondetails.js');
updatedetails.updatePromotion(req,res);

res.render('first',{layout:false});
});

app.get('/searchdate',function(req,res){
var searchdate=require('./searchdetails.js');
console.log("aaya");
searchdate.searchDate(req,res);

//res.render('first',{layout:false});
});

app.get('/deletekardena',function(req,res){

var fs = require('fs');
var writeStream = fs.createWriteStream("file1.xls");

var header="Sl No"+"\t"+" Age"+"\t"+"Name"+"\n";
var row1 = "0"+"\t"+" 21"+"\t"+"Rob"+"\n";
var row2 = "1"+"\t"+" 22"+"\t"+"bob"+"\n";

writeStream.write(header);
writeStream.write(row1);
writeStream.write(row2);
writeStream.close();
//res.render('deletekardena',{pop:"popy",layout:false});
});


var formidable = require('express-formidable'),    
util = require('util');
app.use(formidable());


app.post('/seedData',function(req, res) {
  // console.log(req.files.file);

var seedDataDao=require('./seedDataDAO.js');
seedDataDao.readSeedCsvData(req,res);



})






var port=300;
app.listen(port,function(){

console.log("handle bar app listening");
});
