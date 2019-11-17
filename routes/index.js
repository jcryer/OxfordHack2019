express = require("express");
fs = require("fs");

router = express.Router();



router.get("/", function (req, res, next){//When a get request is made on this directory on this server this function is called
	
	console.log("connection of index-home");
	
	var template = fs.readFileSync(process.cwd() + "/login.html", "utf8");

	res.send(template);//Sends to the user
	
});


router.get("/main.css", function (req, res, next) {
	var template = fs.readFileSync(process.cwd() + "/main.css", "utf8");

	res.send(template);//Sends to the user
});

router.get("/login.js", function (req, res, next) {
	var template = fs.readFileSync(process.cwd() + "/login.js", "utf8");

	res.send(template);//Sends to the user

});


module.exports = router;