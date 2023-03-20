# Webapp from scratch Rijksmuseum

## Inhoudsopgave
- Opdracht
- Omschrijving
- Activity diagram/ontwerp
- Code

## Opdracht
Bij de minor web design en development kregen wij de opracht; maak een online gebruikerservaring voor het Rijksmuseum. 
De bedoeling is dat gebruikers online kunst kunnen bekijken. Met een API kan er data van het Rijksmuseum worden geladen die vervolgens op het scherm getoont moet worden.

Het Rijksmuseum heeft een publieke API die door iedereen gebruikt kan worden, meer informatie vind je [Hier](https://data.rijksmuseum.nl/object-metadata/api/).

##Activity diagram/ ontwerp

<img width="538" alt="image" src="https://user-images.githubusercontent.com/24406793/223833584-f06d77d2-d3a7-4196-bf64-40b307f04a2f.png">

<img width="766" alt="image" src="https://user-images.githubusercontent.com/24406793/223833739-998aed4a-0fbc-4753-b22d-2738b042fcc0.png">


## Code

### data fetch
```Javascript
function fetchData (){
    fetch(apiURL)
                    .then(response => response.json())
                    .then(data => {
                     
                     loader.style.display = 'none';

                    // changeHTML(data) 
                    console.log(data)
                        // Set global state of articles;
                        window.articles = data.artObjects;
                        renderData(window.articles);
                   
                    })

                    .catch(error => {
                        // Handle errors
                        console.error(error);
                        // window.alert("De data kan niet geladen worden, probeer het later opnieuw");
                        // Hide the loading state
                          loader.style.display = 'none';
                      });
}
```

### data render
```Javascript
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
```

### Zoeken
```Javascript 
window.handleSearchChange = (val) => {
    const filteredArticles = articles.filter(x => 
        //x = zoektermen toLowerCase
        
        // x.productionPlaces.toLowerCase().includes(val.toLowerCase()) ||
        x.principalOrFirstMaker.toLowerCase().includes(val.toLowerCase()) ||
        x.title.toLowerCase().includes(val.toLowerCase())
        );
        
    renderData(filteredArticles);
}
```
