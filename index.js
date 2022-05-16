const btnStartGramatica = document.querySelector("#id-start-gramatica");
const gramatica = document.querySelector("#gramatica");
const word = document.querySelector("#word");
const modals = document.querySelectorAll(".modal");
const modal = document.querySelector("#modal1");
const resultMessage = document.querySelector("#result");
document.addEventListener("DOMContentLoaded", function () {
	M.Modal.init(modals);
});

btnStartGramatica.addEventListener("click", () => {
	const instance = M.Modal.getInstance(modal);
	let gram = gramatica.value.split("\n")
	const cyk = new Cyk(word.value, gram);
	resultMessage.innerHTML = cyk.start();
	instance.open();
});
