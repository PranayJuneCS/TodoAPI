var express = require("express");
var bodyParser = require("body-parser");
var _ = require("underscore");

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get("/", function (req, res) {
	res.send("TODO API Root");
});

// GET /todos?completed=___
app.get("/todos", function (req, res) {
	var queryParams = req.query;
	var filteredTodos = todos;

	if (queryParams.hasOwnProperty("completed")) {
		if (queryParams.completed === "true") {
			filteredTodos = _.where(filteredTodos, {completed: true});
		} else {
			filteredTodos = _.where(filteredTodos, {completed: false});
		}
	}

	res.json(filteredTodos);
});
// GET /todos/:id
app.get("/todos/:id", function (req, res) {
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, 
						{id: todoId});
	if (!matchedTodo) {
		res.status(404).send();
	} else {
		res.json(matchedTodo);
	}
});

// POST /todos
app.post("/todos", function (req, res) {
	var body = _.pick(req.body, "description",
						"completed");

	if (!_.isBoolean(body.completed) ||
		!_.isString(body.description) ||
		body.description.trim().length === 0) {
		return res.status(400).send();
	}

	body.description = body.description.trim();

	body.id = todoNextId;
	todos.push(body);
	todoNextId += 1;
	res.json(body);
});

// DELETE /todos/:id
app.delete("/todos/:id", function (req, res) {
	var deleteId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, 
						{id: deleteId});
	if (matchedTodo) {
		todos = _.without(todos, matchedTodo);
		res.json(matchedTodo);
	} else {
		res.status(404).json({
			"error": "no todo with that id"
		});
	}


});

// PUT /todos/:id
app.put("/todos/:id", function (req, res) {
	var body = _.pick(req.body, "description",
						"completed");
	var validAttr = {};
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, 
						{id: todoId});
	if (!matchedTodo) {
		return res.status(404).send();
	}

	if (body.hasOwnProperty("completed") &&
		_.isBoolean(body.completed)) {
		validAttr.completed = body.completed;
	} else if (body.hasOwnProperty("completed")) {
		return res.status(400).send();
	} 

	if (body.hasOwnProperty("description") &&
		_.isString(body.description) &&
		body.description.trim().length > 0) {
		validAttr.description = body.description.trim();
	} else if (body.hasOwnProperty("description")) {
		return res.status(400).send();
	}

	_.extend(matchedTodo, validAttr);
	res.json(matchedTodo);
});

app.listen(PORT, function () {
	console.log("Listening, port " + PORT);
})
