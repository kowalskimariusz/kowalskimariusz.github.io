const opening_btn = document.querySelector("#opening__btn");
const closing_btn = document.querySelector("#closing__btn");
const modal_wrapper = document.querySelector(".modal__wrapper");

opening__btn.addEventListener("click", event => {
	modal_wrapper.style.display = "block";
}, false);

closing__btn.addEventListener("click", event => {
	modal_wrapper.style.display = "none";
}, false);