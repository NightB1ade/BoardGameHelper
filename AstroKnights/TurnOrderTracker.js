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
		'<div class="row mt-1 align-items-center">'
			+ '<div class="col col-3">' + card + '</div>'
			+ '<div class="col col-2"><button class="btn btn-secondary" type="button" onclick="ReturnToDrawDeck(this,\'' + card + '\',\'Top\')">&uArr;</button></div>'
			+ '<div class="col col-2"><button class="btn btn-secondary" type="button" onclick="ReturnToDrawDeck(this,\'' + card + '\',\'Bottom\')">&dArr;</button></div>'
			+ '<div class="col col-2"><button class="btn btn-secondary" type="button" onclick="ReturnToDrawDeck(this,\'' + card + '\',\'Shuffle\')">&#10227;</button></div>'
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

	document.getElementById("btn_Setup").innerHTML = "Number of Heroes: " + numHeroes;
	document.getElementById("TurnOrderSection").classList.remove("d-none");

	if (numHeroes == 1) {
		turnOrderDeck = ["Hero 1","Hero 1","Hero 1","Boss","Boss"];
	} else if (numHeroes == 2) {
		turnOrderDeck = ["Hero 1","Hero 1","Hero 2","Hero 2","Boss","Boss"];
	} else if (numHeroes == 3) {
		turnOrderDeck = ["Hero 1","Hero 2","Hero 3","Wild","Boss","Boss"];
	} else if (numHeroes == 4) {
		turnOrderDeck = ["Hero 1/2","Hero 1/2","Hero 3/4","Hero 3/4","Boss","Boss"];
	}

	turnOrderDrawDeck = [...turnOrderDeck];
	ShuffleArray(turnOrderDrawDeck);

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
