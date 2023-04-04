# Progressive webapp Rijksmuseum

## Inhoudsopgave
- Opdracht
- Omschrijving
- Activity diagram/ontwerp
- Code

## Opdracht
Bij het vak progressive webapp van de minor web design en development kregen wij de opracht; maak een online gebruikerservaring voor het Rijksmuseum. 
De bedoeling is dat gebruikers online kunst kunnen bekijken. Met een API kan er data van het Rijksmuseum worden geladen die vervolgens op het scherm getoont moet worden.

Voor het vak Web App from scratch hadden wij deze opdracht uitgewerkt, maar dan vanaf de kant van de client. Nu was het bij progressive webapp de bedoeling om de applicatie van de client naar de server te verplaatsen. 

Het Rijksmuseum heeft een publieke API die door iedereen gebruikt kan worden, meer informatie vind je [Hier](https://data.rijksmuseum.nl/object-metadata/api/).

## Activity diagram/ ontwerp

<img width="538" alt="image" src="https://user-images.githubusercontent.com/24406793/223833584-f06d77d2-d3a7-4196-bf64-40b307f04a2f.png">

<img width="766" alt="image" src="https://user-images.githubusercontent.com/24406793/223833739-998aed4a-0fbc-4753-b22d-2738b042fcc0.png">


## Code

### Project setup
Het project heeft de standaard indeling van een web app. Ik maak gebruik van een NodeJS backend en van express samen met handlebars om HTML templates te genereren. 

De basis van de app is de app.js. vanuit hier gaat een route naar post.js. Vanuit hier worden de fetches en aanvragen naar de API gedaan.

### data fetch, render en search 
```Javascript
router.get('/', async (req, res) => {
    await fetch ('https://www.rijksmuseum.nl/api/nl/collection?key=wJjmayJK')
    //Standaard fetcht hij 10 resultaten, check api
    .then(res => res.json())
    .then(json => {
        // fetch data ometten in json, in variable zetten
        const kunstwerken = json.artObjects
        // geef kunstwerken mee aan de pagina page, die haal je hier op
        res.render("page", { kunstwerken });
    });
});
```

### Zoeken
Om te zoeken, moet je achter de URL een query meegeven, die zoekresultaten filtert. Dit kan met deze regels code (toegevoegd aan de originele get)
```Javascript 
        const query = req.query.query; 
        const results = kunstwerken.filter(item => item.principalOrFirstMaker.toLowerCase().includes(query));
```
### Handlebars pagina
Zoals te zien bij de functie hierboven, zet ik de gefetchte data in het variabele 'kunstwerken'. Deze geef ik (in dit voorbeeld) mee aan de pagina 'page'. Vervolgens gebeurd er dit in de page.handlebars pagina: 
Hij loopt hier door de 'kunstwerken' heen en voor elk kunstwerk genereerd hij HTML
```handlebars
 {{#each kunstwerk}}
        <div class="detail">
            <h2>{{this.title}}</h2>
            <img src="{{this.webImage.url}}" alt="" loading="lazy">
            <h3>{{this.principalOrFirstMaker}}</h3>
            <p>{{this.productionPlaces}}</p>
        </div>
{{/each}}
```
