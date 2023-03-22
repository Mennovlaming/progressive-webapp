const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    await fetch ('https://www.rijksmuseum.nl/api/nl/collection?key=wJjmayJK')
    .then(res => res.json())
    .then(json => {
        // fetch data ometten in json, in variable zetten
        const kunstwerken = json.artObjects;
        // geef kunstwerken mee aan de pagina test, die haal je hier op
        res.render("test", { kunstwerken });
    })
})

module.exports = router