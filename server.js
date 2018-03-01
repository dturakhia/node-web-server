const express = require("express");
const hbs = require("hbs");
const fs = require("fs");
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set('view engine','hbs');

app.use(function(req, res, next) {
	var now = new Date().toString(),
		log = now + ":" + req.method + req.url;

	fs.appendFile("server.log",log + "\n", function(err){
		if(err){
			console.log(err);
		}
	});

	next();
});

/*app.use(function(req, res, next) {
	res.render("maintenance.hbs");
});*/

app.use(express.static(__dirname + "/public"));

hbs.registerHelper('getCurrentYear',function(){
	return new Date().getFullYear()
});

hbs.registerHelper("screamIt",function(text){
	return text.toUpperCase();
});

app.get("/",function (req, res) {
	/*res.send({
		name: "Andrew",
		likes : ['Biking','Hiking']
	});*/
	res.render("home.hbs",{
		pageTitle : "Home Page",
		welcomeMessage : "Welcome to my website"
	});
});

app.get("/mrmrs",function(req, res){
	console.log(res);
	//if(id == ObjectId(req.params.id)){
		res.send({
			issueReport : "2"
		});
	/*} else {
		res.send({});
	}*/
});

app.get("/heritage-galaxy",function(req, res){
	console.log(res);
	//if(id == ObjectId(req.params.id)){
		res.send({
			issueReport : "1"
		});
	/*} else {
		res.send({});
	}*/
});

app.get("/about",function(req, res){
	res.render("about.hbs", {
		pageTitle : "About Page From JS"
	});
});

app.get("/bad",function(req, res){
	res.send({
		errorMessage : "Unable to handle request"
	});
});

app.get("/help",function(req, res){

});

app.listen(port, function(){
	console.log("Server is up on port " + port);
});
