function CharacterFilter(expansion) {
	var table = document.getElementById("CharacterTable");

	Array.from(table.getElementsByClassName("Expansion_" + expansion)).forEach((item, i) => {
		item.classList.toggle("d-none");
	});
}
