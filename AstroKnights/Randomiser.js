var expansionsData = [];
var currentBosses = [];
var currentKnights = [];
var currentHomeworlds = [];




function Boss_Randomise() {
	var randomBoss = currentBosses[Math.floor(Math.random() * currentBosses.length)];

	document.getElementById("Boss").innerHTML = '<li class="list-group-item">' + randomBoss.name + "</ul>";
}




function ExpansionsModal_Open() {
	ImportData();
}




function ExpansionsModal_Save() {
	var form = document.getElementById("ExpansionsModal_Form");
	var formData = new FormData(form);
	localStorage.setItem("Expansions",JSON.stringify(Object.fromEntries(formData)));

	ImportData();

	bootstrap.Modal.getInstance(document.getElementById("ExpansionsModal")).hide();
}




function Homeworld_Randomise() {
	var randomHomeworld = currentHomeworlds[Math.floor(Math.random() * currentHomeworlds.length)];

	document.getElementById("Homeworld").innerHTML = '<li class="list-group-item">' + randomHomeworld.name + "</ul>";
}




function Knights_Randomise() {
	var form = document.getElementById("Knights_Randomise_Form");
	var numKnights = form.NumKnights.value;
	var randomKnights = [...currentKnights];
	var html = "";

	ShuffleArray(randomKnights);

	for (i = 0 ; i < numKnights ; i++) {
		html += '<ul class="list-group-item">' + randomKnights.pop().name + "</ul>";
	}

	document.getElementById("Knights").innerHTML = html;
}




function ImportData() {
	var form = document.getElementById("ExpansionsModal_Form");

	currentBosses = [];
	currentHomeworlds = [];
	currentKnights = [];

	form.reset();

	if (localStorage != null) {
		var expansions = JSON.parse(localStorage.Expansions);
		if (Object.keys(expansions).length > 0) {
			Object.keys(expansions).forEach((item, i) => {
				form[item].checked = true;
			});
		} else {
			form.IsExpansion_0.checked = true;
		}
	} else {
		form.IsExpansion_0.checked = true;
	}

	var formData = new FormData(form);

	formData.forEach((item, i) => {
		expansionsData[item].bosses.forEach((item, i) => {
			currentBosses.push(item);
		});

		expansionsData[item].homeworlds.forEach((item, i) => {
			currentHomeworlds.push(item);
		});

		expansionsData[item].knights.forEach((item, i) => {
			currentKnights.push(item);
		});
	});
}




function ShuffleArray(array) {
	var currentIndex = array.length;
	var randomIndex;

	while (currentIndex != 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		[
			array[currentIndex]
			,array[randomIndex]
		] = [
			array[randomIndex]
			,array[currentIndex]
		];
	}

	return array;
}




function OnDocumentLoad() {
	fetch("json/Randomiser.json")
		.then(x => x.text())
		.then(y => expansionsData = JSON.parse(y))
		.then(z => ImportData());
}
