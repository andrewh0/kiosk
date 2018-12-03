const express = require('express');
const fetch = require('isomorphic-fetch');

const {
  DARK_SKY_API_KEY,
  NEWS_API_KEY,
  NEWS_SOURCES,
  LONG_LAT,
  COMMA_SEPARATED_TICKERS
} = require('./config');

const app = express();

app.set('port', process.env.PORT || 3001);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('/api/news', (req, res) => {
  fetch(
    `https://newsapi.org/v2/top-headlines?sources=${NEWS_SOURCES}&apiKey=${NEWS_API_KEY}`
  )
    .then(apiResponse => apiResponse.json())
    .then(data => {
      if (data.articles && data.articles.length > 0) {
        res.json({ articles: data.articles });
      }
    });
});

app.get('/api/weather', (req, res) => {
  fetch(`https://api.darksky.net/forecast/${DARK_SKY_API_KEY}/${LONG_LAT}`)
    .then(apiResponse => apiResponse.json())
    .then(data => {
      res.json(data);
    });
});

app.get('/api/stocks', (req, res) => {
  fetch(
    `https://api.iextrading.com/1.0/stock/market/batch?symbols=${COMMA_SEPARATED_TICKERS}&types=quote,news`
  )
    .then(apiResponse => apiResponse.json())
    .then(data => {
      res.json(data);
    });
});

app.listen(app.get('port'), () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`);
  }
});
