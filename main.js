"use strict"


const button = document.querySelector(".btn");
let series = []; //Este es el array vacio para meter las peliculas que han salido al buscar. 
let favorite = [];//Este es el array vacio que usaré para meter las seleccionadas. 

function handlerClick() {

    const text = document.querySelector(".text").value; //Para sacar el dato que escribe en el input

    fetch("https://api.tvmaze.com/search/shows?q=" + text) //Es la url con el nombre de la peli del input

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            const newList = document.querySelector(".list"); //Este es el <ul> principal, así lo selecciono.Aqui dentro va a ir lo nuevo que crearé.

            series = data;//Aquí quiere decir que los resultados se meteran en series.

            newList.innerHTML = "";//Esto es para que se borre la lista anterior y no se me agregue cuando busco otra pelicula. 

            for (let i = 0; i < data.length; i++) {

                const newElement = document.createElement("li");//Aquí creo la etiqueta <li></li>
                const newMovie = document.createTextNode(data[i].show.name);//Aqui creo el texto que va a ir en la <li></li> que son las peliculas que se escriban en el input.
                const newElementImage = document.createElement("img");//Aqui creo la etiqueta <img>

                newElement.id = data[i].show.id;//Con esto se generará un id en el <li> para que no este vacio.
                if (!data[i].show.image) {//Si no hay imagen:

                    newElementImage.src = ("https://via.placeholder.com/210x295/ffffff/666666/?text=TV");//Aquí he intentado añadir la imaen X por si no tiene imagen el resultado pero no se si sale, no se como comprobarlo.

                } else {//Si hay imagen completar por defecto con esto:
                    newElementImage.src = data[i].show.image.medium;
                }
                newList.appendChild(newElement);//Meto dentro del padre <ul> el <li> generado.
                newElement.appendChild(newMovie);//Meto dentro del padre <li> los datos generados en el input
                newElement.appendChild(newElementImage);//Meto dentro del padre <li> los datos del src de la imagen

                newElement.addEventListener("click", handlerFavorite)//Aquí los <li> que escuchen el evento click guardará los id que hagan click en favorite. 
            }
        });
}
button.addEventListener("click", handlerClick);//Este es el evento cuando hace click para buscar el texto de la pelicula.

function handlerFavorite(ev) {

    const favId = parseInt(ev.currentTarget.id);//Aquí se guardará los id de los elementos que hayan hecho click.
    console.log(favId);

    const peliculaFavorita = series.find(pelicula => pelicula.show.id === favId);//El resultado de esto nos da la pelicula entera que coincide el id de las serie con el id de las favoritas.

    const comprobarsiexisteenfavorite = favorite.findIndex(peliculafavorita => peliculafavorita.show.id === favId);

    if (comprobarsiexisteenfavorite == -1) {//quiere decir -1 que no esta en favorites, por lo tanto se puede meter.
        favorite.push(peliculaFavorita);


        const newFavoriteUl = document.querySelector(".ulFavorite");
        newFavoriteUl.innerHTML = "";

        console.log(newFavoriteUl);
        for (let i = 0; i < favorite.length; i++) {

            const newFavoriteLi = document.createElement("li");//Aquí creo una nueva etiqueta <li></li> para las favoritas.
            const newMovieFavorite = document.createTextNode(favorite[i].show.name);//Aqui creo el texto de la favorita en la nueva etiqueta <li></li> de favorita.
            const newMovieImageFavorite = document.createElement("img");//Aqui creo la etiqueta <img> par ameter la imagen de las favoritas.

            if (!favorite[i].show.image) {//Si no hay imagen:

                newMovieImageFavorite.src = ("https://via.placeholder.com/210x295/ffffff/666666/?text=TV");//Añadir esta imagen de X

            } else {//Si hay imagen completar por defecto con esto:
                newMovieImageFavorite.src = favorite[i].show.image.medium;
            }
            newFavoriteLi.classList.add("favoriteList");

            newFavoriteUl.appendChild(newFavoriteLi);//En el nuevo padre-favorito <ul> he metido el nuevo hijo <li> favorito
            newFavoriteLi.appendChild(newMovieFavorite);//En el nuevo padre <li> favorito he metido texto
            newFavoriteLi.appendChild(newMovieImageFavorite);//En el nuevo padre <li> he metido la nueva imagen

        }

    } console.log(favorite);
    localStorage.setItem('preferida', JSON.stringify(favorite));//aqui guardo los datos
    //getLocalStorage();
    ev.currentTarget.classList.toggle("toggle");

}


function getLocalStorage() {

    const contenido = JSON.parse(localStorage.getItem('preferida'));
    console.log(contenido);
    if (contenido !== null) {
        favorite = contenido
    }
    const newFavoriteUl = document.querySelector(".ulFavorite");

    for (let i = 0; i < favorite.length; i++) {//Aqui tengo que hacer una funcion para poder recoger el [i] como arriba

        const liLocal = document.createElement("li");//Aquí creo una nueva etiqueta <li></li> de localStorage
        const movieLocal = document.createTextNode(favorite[i].show.name);//Aqui creo el texto de la favorita en local.
        const MovieImageLocal = document.createElement("img");//Aqui creo la etiqueta <img> para meter la imagen de las favoritas local.
        if (!favorite[i].show.image) {//Si no hay imagen:

            newMovieImageFavorite.src = ("https://via.placeholder.com/210x295/ffffff/666666/?text=TV");//Añadir esta imagen de X

        } else {//Si hay imagen completar por defecto con esto:
            MovieImageLocal.src = favorite[i].show.image.medium;
        }
        newFavoriteUl.appendChild(liLocal);//En el nuevo padre-favorito <ul> he metido el nuevo hijo <li> favorito
        liLocal.appendChild(movieLocal);//En el nuevo padre <li> favorito he metido texto
        liLocal.appendChild(MovieImageLocal);//En el nuevo padre <li> he metido la nueva imagen



    }
}
getLocalStorage();

const listUl = document.querySelector(".list");
const newFavoriteUl = document.querySelector(".ulFavorite");
const reset = document.querySelector(".btnReset");

function handlerReset() {

    localStorage.removeItem('preferida');
    newFavoriteUl.innerHTML = "";
    favorite = [];
    series = [];
    listUl.innerHTML = "";

}

reset.addEventListener("click", handlerReset);