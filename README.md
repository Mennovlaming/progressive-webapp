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


## Code, van WAFS naar PWA

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
## Manifest JS
Om ervoor te zorgen dat de PWA gedownload kan worden en meer informatie geeft, heb ik een manifest,js gemaakt. Hierin staat informatie over de site.

## Service worker
Om de (tot zo ver) webapp te laten werken als een progressive webapp, maak ik gebruik van een service worker. De service worker laadt ik in mijn normale javascript bestand, of in script tags in mijn HTML.

```Javascript
if ('serviceWorker' in navigator) {
  //hij installeert bij elke window
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js');
  });
}
```

Hierdoor laadt hij het bestand 'service-worker.js'.
In de service worker begin ik met het daadwerkelijk installeren van mijn service worker. Vervolgens open in een cache, en voeg ik daar bestanden aan toe.

```Javascript
self.addEventListener('install', function(event) {
  event.waitUntil(
    //open 'my-cache' en voeg de root en offline.html toe
    caches.open('my-cache').then(function(cache) {
      return cache.addAll([
        '/',
        '/offline.html'
      ]);
    })
  );
});
```
Hieronder leg ik uit hoe ik gebruik maak van caching
```Javascript
//onderschep de fetch en catch de response
self.addEventListener('fetch', function(event) {
  event.respondWith(
    //kijkt of de requested resourse al gecached is
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      }
      //Als de resource niet in de cache zit, fetch hem van het netwerk
      return fetch(event.request).then(function(response) {

        //Als de netwerk request faalt of niet 200 terug geeft (200 is goed),
        //return de response hoe hij is, vanuit de cache
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
  
        //responseToCache is een clone van de response, omdat die maar 1 keer gebruikt kan worden.
        var responseToCache = response.clone();
        caches.open('my-cache').then(function(cache) {
          cache.put(event.request, responseToCache);
        });
        return response;
      }).catch(function() {
        //Als het netwerk faalt en het zit niet in de cache, toon de offline page.
        return caches.match('/offline.html');
      });
    })
  );
});
```

## Performance
Om de performance van de site te bekijken en bij te houden, maak ik gebruik van lighthouse plugin. Hiermee genereer je een score voor de performance van je website. Het doel is om deze zo hoog mogelijk te krijgen. 

Toen ik de webiste voor de eerste keer ging testen op de perfomance, kwam ik hier op uit: 
<img width="858" alt="Screenshot 2023-04-04 at 09 53 03" src="https://user-images.githubusercontent.com/24406793/229755053-5d36f116-7dac-4376-a832-15b1851a6404.png">

De site was erg langzaam, dit kwam door de grote images vie de API meegaf, ook lazy loading maakte nauwelijks verschil. Om de images in een gefixte grootte te laten genereren, zet ik achter de image url 400, zodat de image kleiner is dan het origineel, dit helpt enorm met de performance.


```handlebars
<img src="{{this.webImage.url}}400n" alt="" loading="lazy">
```
<img width="866" alt="Screenshot 2023-04-04 at 10 47 22" src="https://user-images.githubusercontent.com/24406793/229755872-943db968-59cb-47c7-89d9-8e93b17f0c3d.png">

### Compression

Compression is een npm package waarmee je de static files kan verkleinen, bestanden zoals javascript, CSS en andere client side bestanden worden gecompressed. 

```Javascript
const compression = require("compression");
app.use(compression());
```
Als laatste heb ik de PWA online gezet met https://www.cyclic.sh 

## Toekomstige toevoegingen
Als ik meer tijd had, zou ik nog wat meer dingen willen toevoegen in de pwa:
1. Een knop waarmee je meer kunstwerken kan laden, door een atribute mee te geven aan de API URL kan je meer dan 10 kunstwerken laden.
2. Code compressen, met UglifyJS en CSS compresion wou ik eigenlijk nog mijn code compressen, ook goed voor de performance.
3. De zoekfunctie nog wat uitgebreider maken.
4. Styling leuker maken
