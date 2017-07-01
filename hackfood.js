const express=require('express')
const app=express()

app.use(express.static('public'))

var Datastore=require('nedb')
var db=new Datastore({filename:'rest.db',autoload:true});
var bb=new Datastore({filename:'blog.db',autoload:true})

app.set('port',process.env.PORT||5000)

app.set('view engine','ejs');

app.get('/',function (req,res) {
res.render('home');
})

app.get('/rate',function (req,res) {
	res.render('rate');
})

app.get('/rateSubmit',function (req,res) {
	var m=req.query.me
	var n=req.query.name
	var a=req.query.ambience
	var t=req.query.taste
	var s=req.query.service
	var T=req.query.ambience+req.query.taste+req.query.service

	var rest={
		"me":m
		"name":n,
		"ambience":a,
		"taste":t,
		"service":s
		"total":T}

db.insert(rest,function(err,result){
	console.log(result);
res.render('ranking');
})

})


app.get('/searchSubmit/:name',function(req,res){
	var a=req.params.name;

	db.find({name:a},function(err,result){
		console.log(result);
		if(result.length!=0){
			res.render('indiv',{res:result});
		}
		else
		{
			res.send("There is no restaurant with the given name. Please retry with a valid name."+a)
		}
	})

})


app.get('/blog',function (req,res) {
res.render('blog');
})


app.get('/blogSubmit',function(req,res){
 
 bb.find({},function'(err,result){
 	if(result.length>0)
 	{
 		res.render('blogView',{result});
 	}

 	else{
 		res.send('Nothing to display')
 	}
 })
})

app.get('/ranking',function (req,res) {
res.render('ranking');
})


app.listen(app.get('port'), function () {
  console.log('Glutton is listening on port 100!')
})