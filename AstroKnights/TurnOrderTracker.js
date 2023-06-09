var turnOrderDeck = [];
var turnOrderDrawDeck = [];




function NewRound() {
	document.getElementById("TurnOrderTracker").innerHTML = "";

	turnOrderDrawDeck = [...turnOrderDeck];
	ShuffleArray(turnOrderDrawDeck);

	document.getElementById("btn_NextTurn").disabled = false;
	document.getElementById("btn_NewRound").disabled = true;
}




function NextTurn() {
	var card = turnOrderDrawDeck.pop();

	document.getElementById("TurnOrderTracker").insertAdjacentHTML("beforeend",
		'<div class="row mt-1 py-2 align-items-center '
		+ (["Boss","Boss 1","Boss 2"].includes(card) ? "bg-danger-subtle" : "")
		+ (["Hero 1","Hero 1/2"].includes(card) ? "bg-primary-subtle" : "")
		+ (["Hero 2","Hero 3/4"].includes(card) ? "bg-secondary-subtle" : "")
		+ (card == "Hero 3" ? "bg-success-subtle" : "")
		+ (card == "Wild" ? "bg-info-subtle" : "")
		+ '">'
			+ '<div class="col col-6 col-sm-4 col-md-2">' + card + '</div>'
			+ '<div class="col col-2 col-md-1"><button class="btn btn-secondary" type="button" onclick="ReturnToDrawDeck(this,\'' + card + '\',\'Top\')">&uArr;</button></div>'
			+ '<div class="col col-2 col-md-1"><button class="btn btn-secondary" type="button" onclick="ReturnToDrawDeck(this,\'' + card + '\',\'Bottom\')">&dArr;</button></div>'
			+ '<div class="col col-2 col-md-1"><button class="btn btn-secondary" type="button" onclick="ReturnToDrawDeck(this,\'' + card + '\',\'Shuffle\')">&#10227;</button></div>'
			+ '<div class="w-100"></div>'
		+ '</div>'
	);

	if (turnOrderDrawDeck.length == 0) {
		document.getElementById("btn_NextTurn").disabled = true;
		document.getElementById("btn_NewRound").disabled = false;
	}
}




function ReturnToDrawDeck(btn,card,position) {
	if (position == "Top") {
		turnOrderDrawDeck.push(card);
	} else if (position == "Bottom") {
		turnOrderDrawDeck.unshift(card);
	} else if (position == "Shuffle") {
		turnOrderDrawDeck.push(card);
		ShuffleArray(turnOrderDrawDeck);
	}

	btn.parentElement.parentElement.outerHTML = "";

	document.getElementById("btn_NextTurn").disabled = false;
	document.getElementById("btn_NewRound").disabled = true;
	console.log(turnOrderDrawDeck);
}




function SetupModal_Save() {
	var form = document.getElementById("SetupModal_Form");
	var numHeroes = form.NumHeroes.value;

	document.getElementById("SetupSettings").innerHTML = '<ul class="list-unstyled">'
		+ '<li>Number of Heroes: ' + numHeroes + '</li>'
		+ '<li>Boss Cards Numbered? ' + (form.IsBossCards_Numbered.checked ? "Yes" : "No") + '</li>'
	+ '</ul>';
	document.getElementById("TurnOrderSection").classList.remove("d-none");

	if (numHeroes == 1) {
		turnOrderDeck = ["Hero 1","Hero 1","Hero 1"];
	} else if (numHeroes == 2) {
		turnOrderDeck = ["Hero 1","Hero 1","Hero 2","Hero 2"];
	} else if (numHeroes == 3) {
		turnOrderDeck = ["Hero 1","Hero 2","Hero 3","Wild"];
	} else if (numHeroes == 4) {
		turnOrderDeck = ["Hero 1/2","Hero 1/2","Hero 3/4","Hero 3/4"];
	}

	if (form.IsBossCards_Numbered.checked) {
		turnOrderDeck.push("Boss 1");
		turnOrderDeck.push("Boss 2");
	} else {
		turnOrderDeck.push("Boss");
		turnOrderDeck.push("Boss");
	}

	turnOrderDrawDeck = [...turnOrderDeck];
	ShuffleArray(turnOrderDrawDeck);

	document.getElementById("TurnOrderTracker").innerHTML = "";
	document.getElementById("btn_NextTurn").disabled = false;
	document.getElementById("btn_NewRound").disabled = true;

	bootstrap.Modal.getInstance(document.getElementById("SetupModal")).hide();
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
