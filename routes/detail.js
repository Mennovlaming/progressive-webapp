// const express = require('express');
// // const fetch = require('node-fetch');
// const router = express.Router();

//   router.get('/artwork/:objectNumber', async (req, res) => {
//     console.log('test', req.params, res.params)
//     const id = req.params.objectNumber;

//     await fetch (`https://www.rijksmuseum.nl/api/${id}?key=wJjmayJK`)
//     .then(res => res.json())
//     .then(json => {
//         // fetch data ometten in json, in variable zetten
//         const kunstwerken = json.artObjects;
//         // geef kunstwerken mee aan de pagina test, die haal je hier op
//         res.render("detail", { kunstwerken });
//     });
// });


//   module.exports = router;