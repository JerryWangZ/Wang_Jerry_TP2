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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtZW51SGFtYnVyZ2VyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImxldCBidG5IYW1idXJnZXI7XHJcbmxldCBhY3RpZiA9IGZhbHNlO1xyXG5sZXQgbWVudTtcclxuXHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgYnRuSGFtYnVyZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG5IYW1idXJnZXJcIik7XHJcbiAgICBtZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50ZXh0ZVwiKTtcclxuICAgIGlmICh3aW5kb3cub3V0ZXJXaWR0aCA8PSA0MTUpIHtcclxuICAgICAgICBtZW51LmNsYXNzTGlzdC50b2dnbGUoXCJ0ZXh0ZVwiKTtcclxuXHJcbiAgICAgICAgbWVudS5jbGFzc0xpc3QuYWRkKFwidGV4dGUyXCIpO1xyXG5cclxuICAgICAgICBidG5IYW1idXJnZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG1lbnVIYW1idXJnZXIpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbmZ1bmN0aW9uIG1lbnVIYW1idXJnZXIoKSB7XHJcbiAgICBhY3RpZiA9ICFhY3RpZjtcclxuXHJcblxyXG4gICAgaWYoYWN0aWYpe1xyXG4gICAgICAgIG1lbnUuY2xhc3NMaXN0LnJlbW92ZShcInRleHRlMlwiKTtcclxuICAgICAgICBtZW51LmNsYXNzTGlzdC5hZGQoXCJ0ZXh0ZTNcIik7XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICAgIG1lbnUuY2xhc3NMaXN0LmFkZChcInRleHRlMlwiKTtcclxuICAgICAgICBtZW51LmNsYXNzTGlzdC5yZW1vdmUoXCJ0ZXh0ZTNcIik7XHJcblxyXG4gICAgfVxyXG59Il0sImZpbGUiOiJtZW51SGFtYnVyZ2VyLmpzIn0=
