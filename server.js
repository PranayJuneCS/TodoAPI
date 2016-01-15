var express = require("express");
var app = express();

var PORT = process.env.PORT || 3000;

app.get("/", function (req, res) {
	res.send("TODO API Root");
});

app.listen(PORT, function () {
	console.log("Listening, port " + PORT);
})

//git subtree push --prefix todo-api heroku master
//Use from node dir to push to heroku