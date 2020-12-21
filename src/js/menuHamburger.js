let btnHamburger;
let actif = false;
let menu;


document.addEventListener("DOMContentLoaded", function () {

    btnHamburger = document.querySelector(".btnHamburger");
    menu = document.querySelector(".texte");
    if (window.outerWidth <= 415) {
        menu.classList.toggle("texte");

        menu.classList.add("texte2");

        btnHamburger.addEventListener("click", menuHamburger);
    }
});

function menuHamburger() {
    actif = !actif;


    if(actif){
        menu.classList.remove("texte2");
        menu.classList.add("texte3");
    }
    else{
        menu.classList.add("texte2");
        menu.classList.remove("texte3");

    }
}