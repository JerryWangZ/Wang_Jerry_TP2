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

