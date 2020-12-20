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
            article.querySelector("h3").innerHTML = data[i].name;
            let image = article.querySelector('img');
            image.src = this.imgPath + "w300" + data[i].profile_path;
            image.alt = data[i].title;

            document.querySelector('.swiper-wrapper').appendChild(article);
        }
    }



}

