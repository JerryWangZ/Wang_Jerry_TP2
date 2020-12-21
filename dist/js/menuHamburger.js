let btnHamburger;
let actif = false;
let menu;



document.addEventListener("DOMContentLoaded", function () {

    btnHamburger = document.querySelector(".btnHamburger");
    menu = document.querySelector(".texte");
    if (window.outerWidth <= 375) {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtZW51SGFtYnVyZ2VyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImxldCBidG5IYW1idXJnZXI7XHJcbmxldCBhY3RpZiA9IGZhbHNlO1xyXG5sZXQgbWVudTtcclxuXHJcblxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIGJ0bkhhbWJ1cmdlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuSGFtYnVyZ2VyXCIpO1xyXG4gICAgbWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGV4dGVcIik7XHJcbiAgICBpZiAod2luZG93Lm91dGVyV2lkdGggPD0gMzc1KSB7XHJcbiAgICAgICAgbWVudS5jbGFzc0xpc3QudG9nZ2xlKFwidGV4dGVcIik7XHJcblxyXG4gICAgICAgIG1lbnUuY2xhc3NMaXN0LmFkZChcInRleHRlMlwiKTtcclxuXHJcbiAgICAgICAgYnRuSGFtYnVyZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBtZW51SGFtYnVyZ2VyKTtcclxuICAgIH1cclxufSk7XHJcbmZ1bmN0aW9uIG1lbnVIYW1idXJnZXIoKSB7XHJcblxyXG4gICAgYWN0aWYgPSAhYWN0aWY7XHJcblxyXG5cclxuICAgIGlmKGFjdGlmKXtcclxuXHJcbiAgICAgICAgbWVudS5jbGFzc0xpc3QucmVtb3ZlKFwidGV4dGUyXCIpO1xyXG4gICAgICAgIG1lbnUuY2xhc3NMaXN0LmFkZChcInRleHRlM1wiKTtcclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgICAgbWVudS5jbGFzc0xpc3QuYWRkKFwidGV4dGUyXCIpO1xyXG4gICAgICAgIG1lbnUuY2xhc3NMaXN0LnJlbW92ZShcInRleHRlM1wiKTtcclxuXHJcbiAgICB9XHJcbn0iXSwiZmlsZSI6Im1lbnVIYW1idXJnZXIuanMifQ==
