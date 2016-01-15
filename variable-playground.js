var person = {
	name: "yo",
	age: 21
}

function updatePerson (obj) {
	// obj = {
	// 	name: "yo",
	// 	age: 18
	// }
	obj.age = 18;
}

//updatePerson(person);
//console.log(person);

var grades = [15, 37];

function updateArray (arr) {
	//arr.push(12);
	arr.push(12);
}

updateArray(grades);
console.log(grades);
