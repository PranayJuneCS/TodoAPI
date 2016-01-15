var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get("/", function (req, res) {
	res.send("TODO API Root");
});

// GET /todos
app.get("/todos", function (req, res) {
	res.json(todos);
});
// GET /todos/:id
app.get("/todos/:id", function (req, res) {
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = undefined;
	todos.forEach(function (todo) {
		if (todo.id === todoId) {
			matchedTodo = todo;
		}
	});
	if (!matchedTodo) {
		res.status(404).send();
	} else {
		res.json(matchedTodo);
	}
});

// POST /todos
app.post("/todos", function (req, res) {
	var body = req.body;
	body.id = todoNextId;
	todos.push(body);
	todoNextId += 1;
	res.json(body);
});

app.listen(PORT, function () {
	console.log("Listening, port " + PORT);
})
