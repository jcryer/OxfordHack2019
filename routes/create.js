const express = require("express");
const fs = require("fs");
const bodyparse = require("body-parser");
const ids = require("short-id");
router = express.Router();


function getNewPin(res,req,ip){
	fs.readFile(process.cwd()+"/rooms.txt","ASCII", function (err, data) {
  		if (err) throw err;
  		
  		lines = data.split("\r\n");
  		//console.log(lines);

  		lines[0]++;

  		ids.configure({
    		length: 6,          // The length of the id strings to generate
    		algorithm: 'sha1',  // The hashing algoritm to use in generating keys
    		salt: lines[0]   // A salt value or function
		});


  	var pin = ids.generate();

		res.send(pin);//Sends to the user

    ip = ip.split(":")[3];

		lines.push(pin+","+ip+","+Date.now().toString(10));


  		var string = ""

  		for(var i = 0; i < lines.length; i++){
  			if (lines[i] != -1){
  				string += lines[i];
  				if(i < lines.length-1){
  					string += "\r\n";
  				}
  			}
  		}

  		fs.writeFile(process.cwd()+"/rooms.txt", string, function (err) {
	  		if (err) throw err;
	  		console.log('Saved!');
		});
		

	}); 

}

router.get("/", function (req, res, next){//When a get request is made on this directory on this server this function is called
	
	console.log("connection of create");
	
	//var template = fs.readFileSync(process.cwd() + "/index.html", "utf8");
	
  console.log(req.header('x-forward-for')||req.connection.remoteAddress);

	var pin = getNewPin(res,req,req.header('x-forward-for')||req.connection.remoteAddress);
	
	
});


module.exports.router = router;