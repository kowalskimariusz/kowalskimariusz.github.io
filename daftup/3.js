const search_input = document.querySelector(".search__input");
const search_btn = document.querySelector(".search__btn");
const list_items = [...document.querySelectorAll(".list__item")];

search_btn.addEventListener("click", (event) => {
    event.preventDefault();
    filter_list(search_input.value.toLowerCase());
}, false);

function filter_list(string){
    list_items.forEach(el => {
        el.style.display = "block";
        if(!el.innerText.toLowerCase().includes(string)){
            el.style.display = "none";
        }
    });
}