const cors = require('cors');
const fetch = require("node-fetch");
const express = require('express');
const app = express();
const shortid = require('shortid');

fetch(request, {mode: 'cors'});

app.use(express.json());
app.set('port', process.env.PORT || 3001);
app.use(cors());

app.locals.title = 'ArtisTry Backend';

app.get('/', (request, response) => {
  response.send('ArtisTry Backend');
});

app.locals.favorites = [
  {
        "title": "Mona Lisa",
        "contentId": 225189,
        "artistContentId": 225091,
        "artistName": "Leonardo da Vinci",
        "completitionYear": 1519,
        "yearAsString": "1519",
        "width": 2835,
        "image": "https://uploads7.wikiart.org/images/leonardo-da-vinci/mona-lisa.jpg!Large.jpg",
        "height": 4289
    },
  {
      "title": "The River Thames with St. Paul's Cathedral on Lord Mayor's Day",
      "contentId": 250550,
      "artistContentId": 250406,
      "artistName": "Canaletto",
      "completitionYear": 1746,
      "yearAsString": "1746",
      "width": 1296,
      "image": "https://uploads6.wikiart.org/images/canaletto/the-river-thames-with-st-paul-s-cathedral-on-lord-mayor-s-day.jpg!Large.jpg",
      "height": 676,
      "name": 'image'
    },
    {
      "title": "Just what is it that makes today's homes so different, so appealing?",
      "contentId": 243774,
      "artistContentId": 243771,
      "artistName": "Richard Hamilton",
      "completitionYear": 1956,
      "yearAsString": "1956",
      "width": 1211,
      "image": "https://uploads3.wikiart.org/images/richard-hamilton/http-en-wikipedia-org-wiki-file-hamilton-appealing2-jpg-1956.jpg!Large.jpg",
      "height": 1260,
      "name": 'image'
    },
    {
      "title": "Cape Cod Morning",
      "contentId": 235538,
      "artistContentId": 235517,
      "artistName": "Edward Hopper",
      "completitionYear": 1950,
      "yearAsString": "1950",
      "width": 1000,
      "image": "https://uploads1.wikiart.org/images/edward-hopper/cape-cod-morning.jpg!Large.jpg",
      "height": 857,
      "name": 'image'
    }
  ]

app.get('/api/v1/favorites', (request, response) => {
  const favorites = app.locals.favorites;
    if(!favorites) {
      return response.sendStatus(404)
    }

  response.json({ favorites });
});

app.post('/api/v1/favorites', (request, response) => {
  const id = shortid.generate();
  const favorite = request.body;

  for (let requiredParameter of [
    'title',
    'contentId',
    'artistContentId',
    'artistName',
    'completitionYear',
    'yearAsString',
    'width',
    'image',
    'height',
    'name'
    ]) {
    if (!favorite[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { artist: <String>, title: <String> }. You're missing a "${requiredParameter}" property.` });
    }
  }

  const { artist, title } = pet;
  app.locals.favorites.push({ artist, title, id });
  response.status(201).json({ artist, title, id });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});
