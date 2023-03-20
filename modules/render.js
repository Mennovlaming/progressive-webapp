// genereer HTML
import $ from "./querySelector.js"

const section = $('section:nth-of-type(2)');

export function clear() {
    section.innerHTML = "";
}

function renderData (data) {
    // Clear eerst, zodat er geen dubbele items gerenderd worden
    clear();
    for(let i = 0; i <= data.length; i++) {
        section.insertAdjacentHTML ("beforeend", `
        <a href='#${data[i].id}'>
            <article>
                <img src="${data[i].webImage.url}" />
                    <div class="text">
                            <h2>${data[i].title}</h2>
                            <h3>${data[i].principalOrFirstMaker}</h3>
                            <!-- <p>${data[i].productionPlaces}</p> -->
                            <p>locatie</p>
                    </div>
            </article>
        </a>
        `)
        
    }
    
}

export default renderData