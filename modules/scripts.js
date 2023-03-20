import fetchData from "./fetchdata.js"
import $ from "./querySelector.js"
import {addHashEvent} from "./articleHandler.js";
import './search.js';

// variables
const title = $('h2')
const artist = $('h3')
const place = $('p')
const image = $('img')
const ul = $('ul')
const title1 = $('h1')



// logica
addHashEvent();
fetchData();


// functions


// function changeHTML(data) {
//     const dataTitle = data.artObjects[0].title
//     const dataArtist = data.artObjects[0].principalOrFirstMaker
//     const dataPlace = data.artObjects[0].productionPlaces
    

//     title.innerHTML = dataTitle
//     artist.innerHTML = dataArtist
//     place.innerHTML = dataPlace

//     image.src = data.artObjects[0].webImage.url

// }

// JS slice s1000 gebruiken om kleinere afbeeldingen te krijgen.

