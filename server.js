const express = require('express');
const app = express();
const shortid = require('shortid');
app.use(express.json());


app.set('port', process.env.PORT || 3000);
app.locals.title = 'Pet Box';

app.get('/', (request, response) => {
  response.send('ArtisTry Backend');
});

app.locals.favorites = [
  { id: 'a1', title: 'Jessica', artist: 'dog', url: 'some/url' },
  { id: 'b2', title: 'Marcus Aurelius', Artist: 'parakeet' },
  { id: 'c3', title: 'Craisins', Artist: 'cat' }
];

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

  for (let requiredParameter of ['artist', 'title', ]) {
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
