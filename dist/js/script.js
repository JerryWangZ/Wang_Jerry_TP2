document.addEventListener("DOMContentLoaded", function () {

    let connexion = new MovieDB();


    if(document.location.pathname.search('fiche-film.html') > 0) {
        let params = ( new URL(document.location) ).searchParams;
        console.log(params);
        connexion.requeteInfoFilm(params.get("id"));
    }
    else {
        connexion.requeteDernierFilm();
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

    requeteDernierFilm() {
        let requete = new XMLHttpRequest();
        requete.addEventListener("loadend", this.retourDernierFilm.bind(this));
        //requete.open("GET", "https://api.themoviedb.org/3/movie/now_playing?api_key=0c479a8fa3849ea10fb0137114f0de03&language=fr-CA&page=1");
        requete.open("GET", this.baseUrl + "movie/now_playing?api_key=" + this.apiKey + "&language=" + this.lang + "&page=1");
        requete.send();
    }

    retourDernierFilm(event) {
        console.log('retourDernierFilm')
        let target = event.currentTarget;
        let data = JSON.parse(target.responseText).results;


        this.afficherDernierFilm(data);

    }

    afficherDernierFilm(data) {
        console.log('affiche')

        let section = document.querySelector('.liste-films');
        console.log(section)

        for (let i = 0; i < this.nbFilm; i++) {
            let article = document.querySelector('.template .film').cloneNode(true);
            article.querySelector('h2').innerHTML = data[i].title;

            article.querySelector('.description').innerHTML = data[i].overview;
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
        document.querySelector("h1").innerHTML = data.title;
        document.querySelector("p.revenue").innerHTML = data.revenue;
        //let src = this.imgPath + "w185" + data.backdrop_path;
        console.log('afficheDernierFilm');
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


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIGxldCBjb25uZXhpb24gPSBuZXcgTW92aWVEQigpO1xyXG5cclxuXHJcbiAgICBpZihkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZS5zZWFyY2goJ2ZpY2hlLWZpbG0uaHRtbCcpID4gMCkge1xyXG4gICAgICAgIGxldCBwYXJhbXMgPSAoIG5ldyBVUkwoZG9jdW1lbnQubG9jYXRpb24pICkuc2VhcmNoUGFyYW1zO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHBhcmFtcyk7XHJcbiAgICAgICAgY29ubmV4aW9uLnJlcXVldGVJbmZvRmlsbShwYXJhbXMuZ2V0KFwiaWRcIikpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY29ubmV4aW9uLnJlcXVldGVEZXJuaWVyRmlsbSgpO1xyXG4gICAgfVxyXG5cclxufSlcclxuXHJcblxyXG5jbGFzcyBNb3ZpZURCIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk5ldyBNb3ZpZURCKClcIik7XHJcbiAgICAgICAgdGhpcy5hcGlLZXkgPSBcIjBjNDc5YThmYTM4NDllYTEwZmIwMTM3MTE0ZjBkZTAzXCI7XHJcbiAgICAgICAgdGhpcy5sYW5nID0gXCJmci1DQVwiO1xyXG4gICAgICAgIHRoaXMuYmFzZVVybCA9IFwiaHR0cHM6Ly9hcGkudGhlbW92aWVkYi5vcmcvMy9cIjtcclxuICAgICAgICB0aGlzLmltZ1BhdGggPSBcImh0dHBzOi8vaW1hZ2UudG1kYi5vcmcvdC9wL1wiO1xyXG4gICAgICAgIHRoaXMubmJGaWxtID0gODtcclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXRlRGVybmllckZpbG0oKSB7XHJcbiAgICAgICAgbGV0IHJlcXVldGUgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICByZXF1ZXRlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZW5kXCIsIHRoaXMucmV0b3VyRGVybmllckZpbG0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgLy9yZXF1ZXRlLm9wZW4oXCJHRVRcIiwgXCJodHRwczovL2FwaS50aGVtb3ZpZWRiLm9yZy8zL21vdmllL25vd19wbGF5aW5nP2FwaV9rZXk9MGM0NzlhOGZhMzg0OWVhMTBmYjAxMzcxMTRmMGRlMDMmbGFuZ3VhZ2U9ZnItQ0EmcGFnZT0xXCIpO1xyXG4gICAgICAgIHJlcXVldGUub3BlbihcIkdFVFwiLCB0aGlzLmJhc2VVcmwgKyBcIm1vdmllL25vd19wbGF5aW5nP2FwaV9rZXk9XCIgKyB0aGlzLmFwaUtleSArIFwiJmxhbmd1YWdlPVwiICsgdGhpcy5sYW5nICsgXCImcGFnZT0xXCIpO1xyXG4gICAgICAgIHJlcXVldGUuc2VuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldG91ckRlcm5pZXJGaWxtKGV2ZW50KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3JldG91ckRlcm5pZXJGaWxtJylcclxuICAgICAgICBsZXQgdGFyZ2V0ID0gZXZlbnQuY3VycmVudFRhcmdldDtcclxuICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UodGFyZ2V0LnJlc3BvbnNlVGV4dCkucmVzdWx0cztcclxuXHJcblxyXG4gICAgICAgIHRoaXMuYWZmaWNoZXJEZXJuaWVyRmlsbShkYXRhKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgYWZmaWNoZXJEZXJuaWVyRmlsbShkYXRhKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2FmZmljaGUnKVxyXG5cclxuICAgICAgICBsZXQgc2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0ZS1maWxtcycpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHNlY3Rpb24pXHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5uYkZpbG07IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYXJ0aWNsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZW1wbGF0ZSAuZmlsbScpLmNsb25lTm9kZSh0cnVlKTtcclxuICAgICAgICAgICAgYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKCdoMicpLmlubmVySFRNTCA9IGRhdGFbaV0udGl0bGU7XHJcblxyXG4gICAgICAgICAgICBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoJy5kZXNjcmlwdGlvbicpLmlubmVySFRNTCA9IGRhdGFbaV0ub3ZlcnZpZXc7XHJcbiAgICAgICAgICAgIGxldCBpbWFnZSA9IGFydGljbGUucXVlcnlTZWxlY3RvcignaW1nJyk7XHJcbiAgICAgICAgICAgIGltYWdlLnNyYyA9IHRoaXMuaW1nUGF0aCArIFwidzMwMFwiICsgZGF0YVtpXS5wb3N0ZXJfcGF0aDtcclxuICAgICAgICAgICAgaW1hZ2UuYWx0ID0gZGF0YVtpXS50aXRsZTtcclxuXHJcbiAgICAgICAgICAgIGFydGljbGUucXVlcnlTZWxlY3RvcignYScpLmhyZWYgPSBcImZpY2hlLWZpbG0uaHRtbD9pZD1cIiArIGRhdGFbaV0uaWQ7XHJcblxyXG4gICAgICAgICAgICBzZWN0aW9uLmFwcGVuZENoaWxkKGFydGljbGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXRlSW5mb0ZpbG0obW92aWVJRClcclxuICAgIHtcclxuICAgICAgICBsZXQgcmVxdWV0ZSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXHJcbiAgICAgICAgcmVxdWV0ZS5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVuZFwiLHRoaXMucmV0b3VyUmVxdWV0ZUluZm9GaWxtLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHJlcXVldGUub3BlbignR0VUJywgdGhpcy5iYXNlVXJsICsgJ21vdmllLycgKyBtb3ZpZUlEICsgJz9hcGlfa2V5PScgKyB0aGlzLmFwaUtleSArICcmbGFuZ3VhZ2U9JyArIHRoaXMubGFuZyk7XHJcbiAgICAgICAgcmVxdWV0ZS5zZW5kKCk7XHJcbiAgICB9XHJcbiAgICByZXRvdXJSZXF1ZXRlSW5mb0ZpbG0oZXZlbnQpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHRhcmdldCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHRhcmdldC5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRhcmdldC5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgIHRoaXMuYWZmaWNoZUluZm9GaWxtKGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIGFmZmljaGVJbmZvRmlsbShkYXRhKXtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaDFcIikuaW5uZXJIVE1MID0gZGF0YS50aXRsZTtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwicC5yZXZlbnVlXCIpLmlubmVySFRNTCA9IGRhdGEucmV2ZW51ZTtcclxuICAgICAgICAvL2xldCBzcmMgPSB0aGlzLmltZ1BhdGggKyBcIncxODVcIiArIGRhdGEuYmFja2Ryb3BfcGF0aDtcclxuICAgICAgICBjb25zb2xlLmxvZygnYWZmaWNoZURlcm5pZXJGaWxtJyk7XHJcbiAgICAgICAgdGhpcy5yZXF1ZXRlQWN0ZXVyKGRhdGEuaWQpXHJcbiAgICB9XHJcblxyXG4gICAgcmVxdWV0ZUFjdGV1cihtb3ZpZUlEKXtcclxuICAgICAgICAvL0dFVCBjcmVkaXQobW92aWVEQilcclxuICAgIH1cclxuXHJcbiAgICByZXRvdXJSZXF1ZXRlQWN0ZXVyKGV2ZW50KXtcclxuICAgICAgICAvL2ZhaXJlIGF0dGVudGlvbiBKU09OLnBhcnNlXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGFmZmljaGVBY3RldXIoZGF0YSl7XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG4iXSwiZmlsZSI6InNjcmlwdC5qcyJ9
