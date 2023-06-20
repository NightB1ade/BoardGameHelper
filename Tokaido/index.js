function CharacterFilter(expansion) {
	var table = document.getElementById("CharacterTable");
	var display = document.getElementById("cbx_Characters_" + expansion).checked;

	Array.from(table.getElementsByClassName("Expansion_" + expansion)).forEach((item, i) => {
		item.classList.toggle("d-none");
	});
}
