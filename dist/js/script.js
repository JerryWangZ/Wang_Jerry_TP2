document.addEventListener("DOMContentLoaded", function () {

    let connexion = new MovieDB();


    if(document.location.pathname.search('fiche-film.html') > 0) {
        let params = ( new URL(document.location) ).searchParams;
        console.log(params);
        connexion.requeteInfoFilm(params.get("id"));
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
            pagination: {
                el: '.swiper-pagination',
            },
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
        console.log(target.responseText);
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

        this.requeteActeur(data.id)
    }

    requeteActeur(movieID){
        //GET credit(movieDB)
    }

    retourRequeteActeur(event){
        //faire attention JSON.parse

    }

    afficheActeur(data){

    }
}


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIGxldCBjb25uZXhpb24gPSBuZXcgTW92aWVEQigpO1xyXG5cclxuXHJcbiAgICBpZihkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZS5zZWFyY2goJ2ZpY2hlLWZpbG0uaHRtbCcpID4gMCkge1xyXG4gICAgICAgIGxldCBwYXJhbXMgPSAoIG5ldyBVUkwoZG9jdW1lbnQubG9jYXRpb24pICkuc2VhcmNoUGFyYW1zO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHBhcmFtcyk7XHJcbiAgICAgICAgY29ubmV4aW9uLnJlcXVldGVJbmZvRmlsbShwYXJhbXMuZ2V0KFwiaWRcIikpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY29ubmV4aW9uLnJlcXVldGVEZXJuaWVyRmlsbSgpO1xyXG4gICAgICAgIGNvbm5leGlvbi5yZXF1ZXRlUG9wdWxhaXJlKCk7XHJcbiAgICB9XHJcblxyXG59KVxyXG5cclxuXHJcbmNsYXNzIE1vdmllREIge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTmV3IE1vdmllREIoKVwiKTtcclxuICAgICAgICB0aGlzLmFwaUtleSA9IFwiMGM0NzlhOGZhMzg0OWVhMTBmYjAxMzcxMTRmMGRlMDNcIjtcclxuICAgICAgICB0aGlzLmxhbmcgPSBcImZyLUNBXCI7XHJcbiAgICAgICAgdGhpcy5iYXNlVXJsID0gXCJodHRwczovL2FwaS50aGVtb3ZpZWRiLm9yZy8zL1wiO1xyXG4gICAgICAgIHRoaXMuaW1nUGF0aCA9IFwiaHR0cHM6Ly9pbWFnZS50bWRiLm9yZy90L3AvXCI7XHJcbiAgICAgICAgdGhpcy5uYkZpbG0gPSA4O1xyXG4gICAgfVxyXG5cclxuICAgIHJlcXVldGVQb3B1bGFpcmUoKSB7XHJcbiAgICAgICAgbGV0IHJlcXVldGUgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICByZXF1ZXRlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZW5kXCIsIHRoaXMucmV0b3VyUG9wdWxhaXJlLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHJlcXVldGUub3BlbihcIkdFVFwiLCB0aGlzLmJhc2VVcmwgKyBcIm1vdmllL3BvcHVsYXI/YXBpX2tleT1cIiArIHRoaXMuYXBpS2V5ICsgXCImbGFuZ3VhZ2U9XCIgKyB0aGlzLmxhbmcgKyBcIiZwYWdlPTFcIik7XHJcbiAgICAgICAgcmVxdWV0ZS5zZW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0b3VyUG9wdWxhaXJlKGV2ZW50KXtcclxuICAgICAgICBsZXQgdGFyZ2V0ID0gZXZlbnQuY3VycmVudFRhcmdldDtcclxuICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UodGFyZ2V0LnJlc3BvbnNlVGV4dCkucmVzdWx0cztcclxuICAgICAgICB0aGlzLmFmZmljaGVyUG9wdWxhaXJlKGRhdGEpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIGFmZmljaGVyUG9wdWxhaXJlKGRhdGEpe1xyXG4gICAgICAgLy8gbGV0IHNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGVtcGxhdGUnKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhcnRpY2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRlbXBsYXRlPi5zd2lwZXItc2xpZGUnKS5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgICAgIGFydGljbGUucXVlcnlTZWxlY3RvcignaDMnKS5pbm5lckhUTUwgPSBkYXRhW2ldLnRpdGxlO1xyXG4gICAgICAgICAgICBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoJ3AuY290ZScpLmlubmVySFRNTCA9IGRhdGFbaV0udm90ZV9hdmVyYWdlICsgJy8xMCc7XHJcbiAgICAgICAgICAgIGFydGljbGUucXVlcnlTZWxlY3RvcignYScpLmhyZWYgPSBcImZpY2hlLWZpbG0uaHRtbD9pZD1cIiArIGRhdGFbaV0uaWQ7XHJcbiAgICAgICAgICAgIGxldCBpbWFnZSA9IGFydGljbGUucXVlcnlTZWxlY3RvcignaW1nJyk7XHJcbiAgICAgICAgICAgIGltYWdlLnNyYyA9IHRoaXMuaW1nUGF0aCArIFwidzEyODBcIiArIGRhdGFbaV0uYmFja2Ryb3BfcGF0aDtcclxuICAgICAgICAgICAgaW1hZ2UuYWx0ID0gZGF0YVtpXS50aXRsZTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN3aXBlci13cmFwcGVyJykuYXBwZW5kQ2hpbGQoYXJ0aWNsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzd2lwZXIgPSBuZXcgU3dpcGVyKCcuc3dpcGVyLWNvbnRhaW5lcicsIHtcclxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgZWw6ICcuc3dpcGVyLXBhZ2luYXRpb24nLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlcXVldGVEZXJuaWVyRmlsbSgpIHtcclxuICAgICAgICBsZXQgcmVxdWV0ZSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHJlcXVldGUuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlbmRcIiwgdGhpcy5yZXRvdXJEZXJuaWVyRmlsbS5iaW5kKHRoaXMpKTtcclxuICAgICAgICAvL3JlcXVldGUub3BlbihcIkdFVFwiLCBcImh0dHBzOi8vYXBpLnRoZW1vdmllZGIub3JnLzMvbW92aWUvbm93X3BsYXlpbmc/YXBpX2tleT0wYzQ3OWE4ZmEzODQ5ZWExMGZiMDEzNzExNGYwZGUwMyZsYW5ndWFnZT1mci1DQSZwYWdlPTFcIik7XHJcbiAgICAgICAgcmVxdWV0ZS5vcGVuKFwiR0VUXCIsIHRoaXMuYmFzZVVybCArIFwibW92aWUvdG9wX3JhdGVkP2FwaV9rZXk9XCIgKyB0aGlzLmFwaUtleSArIFwiJmxhbmd1YWdlPVwiICsgdGhpcy5sYW5nICsgXCImcGFnZT0xXCIpO1xyXG5cclxuICAgICAgICByZXF1ZXRlLnNlbmQoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXRvdXJEZXJuaWVyRmlsbShldmVudCkge1xyXG4gICAgICAgIGxldCB0YXJnZXQgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xyXG4gICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZSh0YXJnZXQucmVzcG9uc2VUZXh0KS5yZXN1bHRzO1xyXG4gICAgICAgIHRoaXMuYWZmaWNoZXJEZXJuaWVyRmlsbShkYXRhKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgYWZmaWNoZXJEZXJuaWVyRmlsbShkYXRhKSB7XHJcblxyXG4gICAgICAgIGxldCBzZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpc3RlLWZpbG1zJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coc2VjdGlvbilcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm5iRmlsbTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhcnRpY2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRlbXBsYXRlIC5maWxtJykuY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgICAgICBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoJ2gxJykuaW5uZXJIVE1MID0gZGF0YVtpXS50aXRsZTtcclxuICAgICAgICAgICAgYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKCcuZGF0ZScpLmlubmVySFRNTCA9IGRhdGFbaV0ucmVsZWFzZV9kYXRlO1xyXG4gICAgICAgICAgICBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoJy5kZXNjcmlwdGlvbicpLmlubmVySFRNTCA9IGRhdGFbaV0ub3ZlcnZpZXcgIHx8IFwiRGVzY3JpcHRpb24gcGFzIGRpc3BvbmlibGVcIjtcclxuICAgICAgICAgICAgYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKCcucmF0aW5nJykuaW5uZXJIVE1MID0gZGF0YVtpXS52b3RlX2F2ZXJhZ2U7XHJcbiAgICAgICAgICAgIGxldCBpbWFnZSA9IGFydGljbGUucXVlcnlTZWxlY3RvcignaW1nJyk7XHJcbiAgICAgICAgICAgIGltYWdlLnNyYyA9IHRoaXMuaW1nUGF0aCArIFwidzMwMFwiICsgZGF0YVtpXS5wb3N0ZXJfcGF0aDtcclxuICAgICAgICAgICAgaW1hZ2UuYWx0ID0gZGF0YVtpXS50aXRsZTtcclxuXHJcbiAgICAgICAgICAgIGFydGljbGUucXVlcnlTZWxlY3RvcignYScpLmhyZWYgPSBcImZpY2hlLWZpbG0uaHRtbD9pZD1cIiArIGRhdGFbaV0uaWQ7XHJcblxyXG4gICAgICAgICAgICBzZWN0aW9uLmFwcGVuZENoaWxkKGFydGljbGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXRlSW5mb0ZpbG0obW92aWVJRClcclxuICAgIHtcclxuICAgICAgICBsZXQgcmVxdWV0ZSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXHJcbiAgICAgICAgcmVxdWV0ZS5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVuZFwiLHRoaXMucmV0b3VyUmVxdWV0ZUluZm9GaWxtLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHJlcXVldGUub3BlbignR0VUJywgdGhpcy5iYXNlVXJsICsgJ21vdmllLycgKyBtb3ZpZUlEICsgJz9hcGlfa2V5PScgKyB0aGlzLmFwaUtleSArICcmbGFuZ3VhZ2U9JyArIHRoaXMubGFuZyk7XHJcbiAgICAgICAgcmVxdWV0ZS5zZW5kKCk7XHJcbiAgICB9XHJcbiAgICByZXRvdXJSZXF1ZXRlSW5mb0ZpbG0oZXZlbnQpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHRhcmdldCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHRhcmdldC5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRhcmdldC5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgIHRoaXMuYWZmaWNoZUluZm9GaWxtKGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIGFmZmljaGVJbmZvRmlsbShkYXRhKXtcclxuICAgICAgICBsZXQgYXJ0aWNsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmljaGUtZmlsbVwiKVxyXG4gICAgICAgIGFydGljbGUucXVlcnlTZWxlY3RvcihcIi50aXRyZVwiKS5pbm5lckhUTUwgPSBkYXRhLnRpdGxlO1xyXG4gICAgICAgIGFydGljbGUucXVlcnlTZWxlY3RvcihcIi5kZXNjcmlwdGlvblwiKS5pbm5lckhUTUwgPSBkYXRhLm92ZXJ2aWV3IHx8IFwiUGFzIGRlIHLDqXN1bcOpXCI7XHJcbiAgICAgICAgYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwiLmR1cmVlXCIpLmlubmVySFRNTCA9IFwiRHVyw6llOiBcIiArIGRhdGEucnVudGltZSArIFwiIG1pblwiO1xyXG4gICAgICAgIGFydGljbGUucXVlcnlTZWxlY3RvcihcInAucmV2ZW51ZVwiKS5pbm5lckhUTUwgPSBcIlJldmVudWU6IFwiICsgZGF0YS5yZXZlbnVlICsgXCIgJFwiO1xyXG4gICAgICAgIGFydGljbGUucXVlcnlTZWxlY3RvcihcInAuZXRvaWxlXCIpLmlubmVySFRNTCA9IFwiTm9tYnJlIGQnw6l0b2lsZTogXCIgKyBkYXRhLnZvdGVfYXZlcmFnZTtcclxuICAgICAgICBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCJwLmxhbmd1ZVwiKS5pbm5lckhUTUwgPSBcIkxhbmd1ZSBvcmlnaW5hbGU6IFwiICsgZGF0YS5vcmlnaW5hbF9sYW5ndWFnZTtcclxuICAgICAgICBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCJwLmJ1ZGdldFwiKS5pbm5lckhUTUwgPSBcIkJ1ZGdldDogXCIgKyBkYXRhLmJ1ZGdldCArIFwiICRcIjtcclxuICAgICAgICBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCJwLmRhdGVcIikuaW5uZXJIVE1MID0gXCJEYXRlIGRlIHNvcnRpZTogXCIgKyBkYXRhLnJlbGVhc2VfZGF0ZTtcclxuXHJcblxyXG4gICAgICAgIGxldCBpbWFnZSA9IGFydGljbGUucXVlcnlTZWxlY3RvcihcImltZ1wiKTtcclxuICAgICAgICBpbWFnZS5zcmMgPSB0aGlzLmltZ1BhdGggKyBcInc1MDBcIiArIGRhdGEuYmFja2Ryb3BfcGF0aDtcclxuICAgICAgICBpbWFnZS5hbHQgPSBkYXRhLnRpdGxlO1xyXG5cclxuICAgICAgICB0aGlzLnJlcXVldGVBY3RldXIoZGF0YS5pZClcclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXRlQWN0ZXVyKG1vdmllSUQpe1xyXG4gICAgICAgIC8vR0VUIGNyZWRpdChtb3ZpZURCKVxyXG4gICAgfVxyXG5cclxuICAgIHJldG91clJlcXVldGVBY3RldXIoZXZlbnQpe1xyXG4gICAgICAgIC8vZmFpcmUgYXR0ZW50aW9uIEpTT04ucGFyc2VcclxuXHJcbiAgICB9XHJcblxyXG4gICAgYWZmaWNoZUFjdGV1cihkYXRhKXtcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbiJdLCJmaWxlIjoic2NyaXB0LmpzIn0=
