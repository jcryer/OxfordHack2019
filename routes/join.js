const express = require("express");
const fs = require("fs");
const bodyparse = require("body-parser");
router = express.Router();


function getNewPin(res,req,pin){
	fs.readFile(process.cwd()+"/rooms.txt","ASCII", function (err, data) {
  		if (err) throw err;
  		
  		lines = data.split("\r\n");
  		//console.log(lines);


      var line;
      //console.log(pin);
      for(var i = 1; i < lines.length; i++){
        line = lines[i].split(",");
        if(line[0] == pin){
          res.send(line[1]);
          //console.log(line[1]);
          return;
        }
      }

      //Sends to the user

		

  		
		

	}); 

}

router.post("/", function (req, res, next){//When a get request is made on this directory on this server this function is called
	
	console.log("connection of create");
	
	//var template = fs.readFileSync(process.cwd() + "/index.html", "utf8");
	var body = req.body;

	
	var pin = getNewPin(res,req,req.body.pin);
	
	
});


module.exports = router;