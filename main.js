"use strict"


const button = document.querySelector(".btn");
let series =[]; //Este es el array vacio para meter las peliculas que han salido al buscar. 
let favorite=[];//Este es el array vacio que usaré para meter las seleccionadas. 

function handlerClick() {

  const text = document.querySelector(".text").value; //Para sacar el dato que escribe en el input

  fetch("https://api.tvmaze.com/search/shows?q=" + text) //Es la url con el nombre de la peli del input

    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

      series=data;//Aquí quiere decir que los resultados se meteran en series.

      for (let i = 0; i < data.length; i++) {

        const newList = document.querySelector(".list");//Este es el <ul>, así lo selecciono.
        const newElement = document.createElement("li");//Aquí creo la etiqueta <li></li>
        const newMovie = document.createTextNode(data[i].show.name);//Aqui creo el texto que va a ir en la <li></li> que son las peliculas que se escriban en el input.
        const newElementImage = document.createElement("img");//Aqui creo la etiqueta <img>
        
        newElement.id = data[i].show.id;//Con esto se generará un id en el <li>
        if (!data[i].show.image) {//Si no hay imagen:

          newElementImage.src = ("https://via.placeholder.com/210x295/ffffff/666666/?text=TV");//Aquí he intentado añadir la imaen X por si no tiene imagen el resultado pero no se si sale, no se como comprobarlo.
          
        }else{//Si hay imagen completar por defecto con esto:
          newElementImage.src = data[i].show.image.medium;
        }
        newList.appendChild(newElement);//Meto dentro del padre <ul> el <li> generado.
        newElement.appendChild(newMovie);//Meto dentro del padre <li> los datos generados en el input
        newElement.appendChild(newElementImage);//Meto dentro del padre <li> los datos del src de la imagen
        //console.log(newElementImage);//Acordarme de borrar todos los console.log
        //console.log(newElement);//Este tambien borrarlo. 
        newElement.addEventListener("click",handlerFavorite)//Aquí los <li> que escuchen el evento click guardará los id que hagan click en favorite. 
      }
    });
}
button.addEventListener("click", handlerClick);//Este es el evento cuando hace click para buscar el texto de la pelicula.


function handlerFavorite(ev){

 let favorite=ev.currentTarget.id;//Aquí se guardará los id de los elementos que hayan hecho click.
 console.log(favorite);
}



//const favoriteId=favorite.find(id=>favorite.data[i].id);
//console.log(favoriteId);

// let series = series.find(id => data[i].id);

// console.log(favorite);







