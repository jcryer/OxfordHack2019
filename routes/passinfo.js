const express = require("express");
const fs = require("fs");

var router = express.Router();

router.post("/", function(req,res,next){
	var body = req.body;
	//console.log("post "+body.room+" "+body.user);
	var output = "";
	if (body.data.type != "offer" && body.data.type != "answer") {
		output += "#";
	}
	output += JSON.stringify(req.body);
	fs.appendFile(process.cwd()+`/connections/${req.body.user}-${req.body.room}.txt`,output,function(err,file){
		if(err){
			console.log(err);
			next(err);
		}

		res.send("ok");
	});
});

router.get("/", function(req,res,next){
	var user = req.query.user;
	var room = req.query.room;
	var userO;
	if(user == "c"){
		userO = "j";
	}else{
		userO = "c";
	}
	//console.log("get request "+room +" "+userO);

	fs.access(process.cwd()+`/connections/${userO}-${room}.txt`, fs.F_OK, (err) => {
	  if (err) {
	    //console.error(err)
	    res.send("fail");
	    return
	  }

		fs.readFile(process.cwd()+`/connections/${userO}-${room}.txt`,"ASCII",function(err,data){
			if(err) {
				console.log(err);
				next(err);
				return;
			}

			var line = data.split("#");

			if(!data){
				res.send("out");
				return;
			}
			
			//console.log("data:");
			//console.log(line[0]);
			res.send(line[0]);

			string = ""
			for(var i = 1; i < line.length; i++){
				string += line[i];
				if(i < line.length-1){
					string += "#";
				}
			}
			fs.unlink(process.cwd()+`/connections/${userO}-${room}.txt`, function(err){
				fs.writeFile(process.cwd()+`/connections/${userO}-${room}.txt`,string,function(err,file){
					if(err){
						console.log(err);
						next(err);
					}
				});
			});

		});
	});
});

module.exports = router;