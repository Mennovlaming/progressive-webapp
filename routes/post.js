const express = require('express');
const router = express.Router();

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

//detailpagia, pak /artwork en unieke objectnumber, fetch dat + .objectnumber, 
//hierdoor fetch je 1 kunstwerk ipv meerdere, dit geef je vervolgens mee aan de
//detailpagina.
router.get('/artwork/:objectNumber', async (req, res) => {
    await fetch('https://www.rijksmuseum.nl/api/nl/collection?key=wJjmayJK&q=' + req.params.objectNumber)
      .then(res => res.json())
      .then(json => {
          const kunstwerk = json.artObjects;
          res.render("detail", { kunstwerk });
      })
      
  });


router.get('/search', async (req, res) => {
    await fetch ('https://www.rijksmuseum.nl/api/nl/collection?key=wJjmayJK')
    .then(res => res.json())
    .then(json => {
        // fetch data ometten in json, in variable zetten
        const kunstwerken = json.artObjects;
        const query = req.query.query; // Read the search term from the query parameter
        const results = kunstwerken.filter(item => item.principalOrFirstMaker.toLowerCase().includes(query)); // Filter the data based on the search term
        // geef kunstwerken mee aan de pagina page, die haal je hier op
        res.render("search", { results });
        
    });
});


module.exports = router;