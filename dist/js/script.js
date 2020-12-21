document.addEventListener("DOMContentLoaded", function () {

    let connexion = new MovieDB();
    const btnScrollToTop = document.querySelector("#btnScrollToTop");
    btnScrollToTop.addEventListener("click",function (){
        window.scrollTo({
            top:0,
            left:0,
            behavior:"smooth",
        })
    })

    if(document.location.pathname.search('fiche-film.html') > 0) {
        let params = ( new URL(document.location) ).searchParams;
        console.log(params);
        connexion.requeteInfoFilm(params.get("id"));
        connexion.requeteActeur(params.get("id"));
    }
    else {
        connexion.requeteDernierFilm();
        connexion.requetePopulaire();

    }

})


class MovieDB {

    constructor() {
        console.log("New MovieDB()");
        this.apiKey = "0c479a8fa3849ea10fb0137114f0de03";
        this.lang = "fr-CA";
        this.baseUrl = "https://api.themoviedb.org/3/";
        this.imgPath = "https://image.tmdb.org/t/p/";
        this.nbFilm = 8;
    }

    requetePopulaire() {
        let requete = new XMLHttpRequest();
        requete.addEventListener("loadend", this.retourPopulaire.bind(this));
        requete.open("GET", this.baseUrl + "movie/popular?api_key=" + this.apiKey + "&language=" + this.lang + "&page=1");
        requete.send();
    }

    retourPopulaire(event){
        let target = event.currentTarget;
        let data = JSON.parse(target.responseText).results;
        this.afficherPopulaire(data);
        console.log(data);
    }

    afficherPopulaire(data){
       // let section = document.querySelector('.template');

        for (let i = 0; i < 10; i++) {
            let article = document.querySelector('.template>.swiper-slide').cloneNode(true);
            article.querySelector('h3').innerHTML = data[i].title;
            article.querySelector('p.cote').innerHTML = data[i].vote_average + '/10';
            article.querySelector('a').href = "fiche-film.html?id=" + data[i].id;
            let image = article.querySelector('img');
            image.src = this.imgPath + "w1280" + data[i].backdrop_path;
            image.alt = data[i].title;



            document.querySelector('.swiper-wrapper').appendChild(article);
        }
        var swiper = new Swiper('.swiper-container', {

        });
    }

    requeteDernierFilm() {
        let requete = new XMLHttpRequest();
        requete.addEventListener("loadend", this.retourDernierFilm.bind(this));
        //requete.open("GET", "https://api.themoviedb.org/3/movie/now_playing?api_key=0c479a8fa3849ea10fb0137114f0de03&language=fr-CA&page=1");
        requete.open("GET", this.baseUrl + "movie/top_rated?api_key=" + this.apiKey + "&language=" + this.lang + "&page=1");

        requete.send();
    }

    retourDernierFilm(event) {
        let target = event.currentTarget;
        let data = JSON.parse(target.responseText).results;
        this.afficherDernierFilm(data);

    }

    afficherDernierFilm(data) {

        let section = document.querySelector('.liste-films');
        console.log(section)

        for (let i = 0; i < this.nbFilm; i++) {
            let article = document.querySelector('.template .film').cloneNode(true);
            article.querySelector('h1').innerHTML = data[i].title;
            article.querySelector('.date').innerHTML = data[i].release_date;
            article.querySelector('.description').innerHTML = data[i].overview  || "Description pas disponible";
            article.querySelector('.rating').innerHTML = data[i].vote_average;
            let image = article.querySelector('img');
            image.src = this.imgPath + "w300" + data[i].poster_path;
            image.alt = data[i].title;

            article.querySelector('a').href = "fiche-film.html?id=" + data[i].id;

            section.appendChild(article);
        }
    }

    requeteInfoFilm(movieID)
    {
        let requete = new XMLHttpRequest()
        requete.addEventListener("loadend",this.retourRequeteInfoFilm.bind(this));
        requete.open('GET', this.baseUrl + 'movie/' + movieID + '?api_key=' + this.apiKey + '&language=' + this.lang);
        requete.send();
    }
    retourRequeteInfoFilm(event)
    {
        let target = event.currentTarget;
        let data = JSON.parse(target.responseText);
       // console.log(target.responseText);
        this.afficheInfoFilm(data);
    }

    afficheInfoFilm(data){
        let article = document.querySelector(".fiche-film")
        article.querySelector(".titre").innerHTML = data.title;
        article.querySelector(".description").innerHTML = data.overview || "Pas de résumé";
        article.querySelector(".duree").innerHTML = "Durée: " + data.runtime + " min";
        article.querySelector("p.revenue").innerHTML = "Revenue: " + data.revenue + " $";
        article.querySelector("p.etoile").innerHTML = "Nombre d'étoile: " + data.vote_average;
        article.querySelector("p.langue").innerHTML = "Langue originale: " + data.original_language;
        article.querySelector("p.budget").innerHTML = "Budget: " + data.budget + " $";
        article.querySelector("p.date").innerHTML = "Date de sortie: " + data.release_date;


        let image = article.querySelector("img");
        image.src = this.imgPath + "w500" + data.backdrop_path;
        image.alt = data.title;

        // this.requeteActeur(data.id)
    }

    requeteActeur(movieID){
        //GET credit(movieDB)
        let requete = new XMLHttpRequest();
        requete.addEventListener("loadend", this.retourRequeteActeur.bind(this));
        requete.open("GET", this.baseUrl+'movie/'+ movieID +'/credits?api_key='+ this.apiKey+'&language=' +this.lang);
        requete.send();
    }

    retourRequeteActeur(event){
        //faire attention JSON.parse
        let target = event.currentTarget;
        let data = JSON.parse(target.responseText).cast;
        this.afficheActeur(data);
        console.log(data);


    }

    afficheActeur(data){
        console.log(data.length);
        for (let i = 0; i < data.length; i++) {
            let article = document.querySelector('.template>.swiper-slide').cloneNode(true);
            let image = article.querySelector('img');
            image.src = this.imgPath + "w300" + data[i].profile_path;
            image.alt = data[i].title;

            document.querySelector('.swiper-wrapper').appendChild(article);
        }
        var swiper = new Swiper('.swiper-container', {

        });
    }



}


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIGxldCBjb25uZXhpb24gPSBuZXcgTW92aWVEQigpO1xyXG4gICAgY29uc3QgYnRuU2Nyb2xsVG9Ub3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2J0blNjcm9sbFRvVG9wXCIpO1xyXG4gICAgYnRuU2Nyb2xsVG9Ub3AuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKHtcclxuICAgICAgICAgICAgdG9wOjAsXHJcbiAgICAgICAgICAgIGxlZnQ6MCxcclxuICAgICAgICAgICAgYmVoYXZpb3I6XCJzbW9vdGhcIixcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgICBpZihkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZS5zZWFyY2goJ2ZpY2hlLWZpbG0uaHRtbCcpID4gMCkge1xyXG4gICAgICAgIGxldCBwYXJhbXMgPSAoIG5ldyBVUkwoZG9jdW1lbnQubG9jYXRpb24pICkuc2VhcmNoUGFyYW1zO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHBhcmFtcyk7XHJcbiAgICAgICAgY29ubmV4aW9uLnJlcXVldGVJbmZvRmlsbShwYXJhbXMuZ2V0KFwiaWRcIikpO1xyXG4gICAgICAgIGNvbm5leGlvbi5yZXF1ZXRlQWN0ZXVyKHBhcmFtcy5nZXQoXCJpZFwiKSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBjb25uZXhpb24ucmVxdWV0ZURlcm5pZXJGaWxtKCk7XHJcbiAgICAgICAgY29ubmV4aW9uLnJlcXVldGVQb3B1bGFpcmUoKTtcclxuXHJcbiAgICB9XHJcblxyXG59KVxyXG5cclxuXHJcbmNsYXNzIE1vdmllREIge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTmV3IE1vdmllREIoKVwiKTtcclxuICAgICAgICB0aGlzLmFwaUtleSA9IFwiMGM0NzlhOGZhMzg0OWVhMTBmYjAxMzcxMTRmMGRlMDNcIjtcclxuICAgICAgICB0aGlzLmxhbmcgPSBcImZyLUNBXCI7XHJcbiAgICAgICAgdGhpcy5iYXNlVXJsID0gXCJodHRwczovL2FwaS50aGVtb3ZpZWRiLm9yZy8zL1wiO1xyXG4gICAgICAgIHRoaXMuaW1nUGF0aCA9IFwiaHR0cHM6Ly9pbWFnZS50bWRiLm9yZy90L3AvXCI7XHJcbiAgICAgICAgdGhpcy5uYkZpbG0gPSA4O1xyXG4gICAgfVxyXG5cclxuICAgIHJlcXVldGVQb3B1bGFpcmUoKSB7XHJcbiAgICAgICAgbGV0IHJlcXVldGUgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICByZXF1ZXRlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZW5kXCIsIHRoaXMucmV0b3VyUG9wdWxhaXJlLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHJlcXVldGUub3BlbihcIkdFVFwiLCB0aGlzLmJhc2VVcmwgKyBcIm1vdmllL3BvcHVsYXI/YXBpX2tleT1cIiArIHRoaXMuYXBpS2V5ICsgXCImbGFuZ3VhZ2U9XCIgKyB0aGlzLmxhbmcgKyBcIiZwYWdlPTFcIik7XHJcbiAgICAgICAgcmVxdWV0ZS5zZW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0b3VyUG9wdWxhaXJlKGV2ZW50KXtcclxuICAgICAgICBsZXQgdGFyZ2V0ID0gZXZlbnQuY3VycmVudFRhcmdldDtcclxuICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UodGFyZ2V0LnJlc3BvbnNlVGV4dCkucmVzdWx0cztcclxuICAgICAgICB0aGlzLmFmZmljaGVyUG9wdWxhaXJlKGRhdGEpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIGFmZmljaGVyUG9wdWxhaXJlKGRhdGEpe1xyXG4gICAgICAgLy8gbGV0IHNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGVtcGxhdGUnKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhcnRpY2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRlbXBsYXRlPi5zd2lwZXItc2xpZGUnKS5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgICAgIGFydGljbGUucXVlcnlTZWxlY3RvcignaDMnKS5pbm5lckhUTUwgPSBkYXRhW2ldLnRpdGxlO1xyXG4gICAgICAgICAgICBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoJ3AuY290ZScpLmlubmVySFRNTCA9IGRhdGFbaV0udm90ZV9hdmVyYWdlICsgJy8xMCc7XHJcbiAgICAgICAgICAgIGFydGljbGUucXVlcnlTZWxlY3RvcignYScpLmhyZWYgPSBcImZpY2hlLWZpbG0uaHRtbD9pZD1cIiArIGRhdGFbaV0uaWQ7XHJcbiAgICAgICAgICAgIGxldCBpbWFnZSA9IGFydGljbGUucXVlcnlTZWxlY3RvcignaW1nJyk7XHJcbiAgICAgICAgICAgIGltYWdlLnNyYyA9IHRoaXMuaW1nUGF0aCArIFwidzEyODBcIiArIGRhdGFbaV0uYmFja2Ryb3BfcGF0aDtcclxuICAgICAgICAgICAgaW1hZ2UuYWx0ID0gZGF0YVtpXS50aXRsZTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN3aXBlci13cmFwcGVyJykuYXBwZW5kQ2hpbGQoYXJ0aWNsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzd2lwZXIgPSBuZXcgU3dpcGVyKCcuc3dpcGVyLWNvbnRhaW5lcicsIHtcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVxdWV0ZURlcm5pZXJGaWxtKCkge1xyXG4gICAgICAgIGxldCByZXF1ZXRlID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgcmVxdWV0ZS5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVuZFwiLCB0aGlzLnJldG91ckRlcm5pZXJGaWxtLmJpbmQodGhpcykpO1xyXG4gICAgICAgIC8vcmVxdWV0ZS5vcGVuKFwiR0VUXCIsIFwiaHR0cHM6Ly9hcGkudGhlbW92aWVkYi5vcmcvMy9tb3ZpZS9ub3dfcGxheWluZz9hcGlfa2V5PTBjNDc5YThmYTM4NDllYTEwZmIwMTM3MTE0ZjBkZTAzJmxhbmd1YWdlPWZyLUNBJnBhZ2U9MVwiKTtcclxuICAgICAgICByZXF1ZXRlLm9wZW4oXCJHRVRcIiwgdGhpcy5iYXNlVXJsICsgXCJtb3ZpZS90b3BfcmF0ZWQ/YXBpX2tleT1cIiArIHRoaXMuYXBpS2V5ICsgXCImbGFuZ3VhZ2U9XCIgKyB0aGlzLmxhbmcgKyBcIiZwYWdlPTFcIik7XHJcblxyXG4gICAgICAgIHJlcXVldGUuc2VuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldG91ckRlcm5pZXJGaWxtKGV2ZW50KSB7XHJcbiAgICAgICAgbGV0IHRhcmdldCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHRhcmdldC5yZXNwb25zZVRleHQpLnJlc3VsdHM7XHJcbiAgICAgICAgdGhpcy5hZmZpY2hlckRlcm5pZXJGaWxtKGRhdGEpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBhZmZpY2hlckRlcm5pZXJGaWxtKGRhdGEpIHtcclxuXHJcbiAgICAgICAgbGV0IHNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlzdGUtZmlsbXMnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhzZWN0aW9uKVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubmJGaWxtOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGFydGljbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGVtcGxhdGUgLmZpbG0nKS5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgICAgIGFydGljbGUucXVlcnlTZWxlY3RvcignaDEnKS5pbm5lckhUTUwgPSBkYXRhW2ldLnRpdGxlO1xyXG4gICAgICAgICAgICBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoJy5kYXRlJykuaW5uZXJIVE1MID0gZGF0YVtpXS5yZWxlYXNlX2RhdGU7XHJcbiAgICAgICAgICAgIGFydGljbGUucXVlcnlTZWxlY3RvcignLmRlc2NyaXB0aW9uJykuaW5uZXJIVE1MID0gZGF0YVtpXS5vdmVydmlldyAgfHwgXCJEZXNjcmlwdGlvbiBwYXMgZGlzcG9uaWJsZVwiO1xyXG4gICAgICAgICAgICBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoJy5yYXRpbmcnKS5pbm5lckhUTUwgPSBkYXRhW2ldLnZvdGVfYXZlcmFnZTtcclxuICAgICAgICAgICAgbGV0IGltYWdlID0gYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKCdpbWcnKTtcclxuICAgICAgICAgICAgaW1hZ2Uuc3JjID0gdGhpcy5pbWdQYXRoICsgXCJ3MzAwXCIgKyBkYXRhW2ldLnBvc3Rlcl9wYXRoO1xyXG4gICAgICAgICAgICBpbWFnZS5hbHQgPSBkYXRhW2ldLnRpdGxlO1xyXG5cclxuICAgICAgICAgICAgYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKCdhJykuaHJlZiA9IFwiZmljaGUtZmlsbS5odG1sP2lkPVwiICsgZGF0YVtpXS5pZDtcclxuXHJcbiAgICAgICAgICAgIHNlY3Rpb24uYXBwZW5kQ2hpbGQoYXJ0aWNsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlcXVldGVJbmZvRmlsbShtb3ZpZUlEKVxyXG4gICAge1xyXG4gICAgICAgIGxldCByZXF1ZXRlID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcclxuICAgICAgICByZXF1ZXRlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZW5kXCIsdGhpcy5yZXRvdXJSZXF1ZXRlSW5mb0ZpbG0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgcmVxdWV0ZS5vcGVuKCdHRVQnLCB0aGlzLmJhc2VVcmwgKyAnbW92aWUvJyArIG1vdmllSUQgKyAnP2FwaV9rZXk9JyArIHRoaXMuYXBpS2V5ICsgJyZsYW5ndWFnZT0nICsgdGhpcy5sYW5nKTtcclxuICAgICAgICByZXF1ZXRlLnNlbmQoKTtcclxuICAgIH1cclxuICAgIHJldG91clJlcXVldGVJbmZvRmlsbShldmVudClcclxuICAgIHtcclxuICAgICAgICBsZXQgdGFyZ2V0ID0gZXZlbnQuY3VycmVudFRhcmdldDtcclxuICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UodGFyZ2V0LnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAvLyBjb25zb2xlLmxvZyh0YXJnZXQucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICB0aGlzLmFmZmljaGVJbmZvRmlsbShkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBhZmZpY2hlSW5mb0ZpbG0oZGF0YSl7XHJcbiAgICAgICAgbGV0IGFydGljbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZpY2hlLWZpbG1cIilcclxuICAgICAgICBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCIudGl0cmVcIikuaW5uZXJIVE1MID0gZGF0YS50aXRsZTtcclxuICAgICAgICBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCIuZGVzY3JpcHRpb25cIikuaW5uZXJIVE1MID0gZGF0YS5vdmVydmlldyB8fCBcIlBhcyBkZSByw6lzdW3DqVwiO1xyXG4gICAgICAgIGFydGljbGUucXVlcnlTZWxlY3RvcihcIi5kdXJlZVwiKS5pbm5lckhUTUwgPSBcIkR1csOpZTogXCIgKyBkYXRhLnJ1bnRpbWUgKyBcIiBtaW5cIjtcclxuICAgICAgICBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCJwLnJldmVudWVcIikuaW5uZXJIVE1MID0gXCJSZXZlbnVlOiBcIiArIGRhdGEucmV2ZW51ZSArIFwiICRcIjtcclxuICAgICAgICBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCJwLmV0b2lsZVwiKS5pbm5lckhUTUwgPSBcIk5vbWJyZSBkJ8OpdG9pbGU6IFwiICsgZGF0YS52b3RlX2F2ZXJhZ2U7XHJcbiAgICAgICAgYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwicC5sYW5ndWVcIikuaW5uZXJIVE1MID0gXCJMYW5ndWUgb3JpZ2luYWxlOiBcIiArIGRhdGEub3JpZ2luYWxfbGFuZ3VhZ2U7XHJcbiAgICAgICAgYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwicC5idWRnZXRcIikuaW5uZXJIVE1MID0gXCJCdWRnZXQ6IFwiICsgZGF0YS5idWRnZXQgKyBcIiAkXCI7XHJcbiAgICAgICAgYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwicC5kYXRlXCIpLmlubmVySFRNTCA9IFwiRGF0ZSBkZSBzb3J0aWU6IFwiICsgZGF0YS5yZWxlYXNlX2RhdGU7XHJcblxyXG5cclxuICAgICAgICBsZXQgaW1hZ2UgPSBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCJpbWdcIik7XHJcbiAgICAgICAgaW1hZ2Uuc3JjID0gdGhpcy5pbWdQYXRoICsgXCJ3NTAwXCIgKyBkYXRhLmJhY2tkcm9wX3BhdGg7XHJcbiAgICAgICAgaW1hZ2UuYWx0ID0gZGF0YS50aXRsZTtcclxuXHJcbiAgICAgICAgLy8gdGhpcy5yZXF1ZXRlQWN0ZXVyKGRhdGEuaWQpXHJcbiAgICB9XHJcblxyXG4gICAgcmVxdWV0ZUFjdGV1cihtb3ZpZUlEKXtcclxuICAgICAgICAvL0dFVCBjcmVkaXQobW92aWVEQilcclxuICAgICAgICBsZXQgcmVxdWV0ZSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHJlcXVldGUuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlbmRcIiwgdGhpcy5yZXRvdXJSZXF1ZXRlQWN0ZXVyLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHJlcXVldGUub3BlbihcIkdFVFwiLCB0aGlzLmJhc2VVcmwrJ21vdmllLycrIG1vdmllSUQgKycvY3JlZGl0cz9hcGlfa2V5PScrIHRoaXMuYXBpS2V5KycmbGFuZ3VhZ2U9JyArdGhpcy5sYW5nKTtcclxuICAgICAgICByZXF1ZXRlLnNlbmQoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXRvdXJSZXF1ZXRlQWN0ZXVyKGV2ZW50KXtcclxuICAgICAgICAvL2ZhaXJlIGF0dGVudGlvbiBKU09OLnBhcnNlXHJcbiAgICAgICAgbGV0IHRhcmdldCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHRhcmdldC5yZXNwb25zZVRleHQpLmNhc3Q7XHJcbiAgICAgICAgdGhpcy5hZmZpY2hlQWN0ZXVyKGRhdGEpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgYWZmaWNoZUFjdGV1cihkYXRhKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhLmxlbmd0aCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhcnRpY2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRlbXBsYXRlPi5zd2lwZXItc2xpZGUnKS5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgICAgIGxldCBpbWFnZSA9IGFydGljbGUucXVlcnlTZWxlY3RvcignaW1nJyk7XHJcbiAgICAgICAgICAgIGltYWdlLnNyYyA9IHRoaXMuaW1nUGF0aCArIFwidzMwMFwiICsgZGF0YVtpXS5wcm9maWxlX3BhdGg7XHJcbiAgICAgICAgICAgIGltYWdlLmFsdCA9IGRhdGFbaV0udGl0bGU7XHJcblxyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3dpcGVyLXdyYXBwZXInKS5hcHBlbmRDaGlsZChhcnRpY2xlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHN3aXBlciA9IG5ldyBTd2lwZXIoJy5zd2lwZXItY29udGFpbmVyJywge1xyXG5cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG5cclxufVxyXG5cclxuIl0sImZpbGUiOiJzY3JpcHQuanMifQ==
