const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3000;

app.use('/dist', express.static('dist'));

app.get('/data', (req, res) => {
  const r = Math.random;
  const people = [r(), r(), r(), r(), r(), r(), r(), r()];

  res.json({ people });
});

app.get('/city/search', (req, res) => {
  const { text } = req.query;

  if (!text) {
    return res.json({ cities: [] });
  }

  fetch(`https://api.apixu.com/v1/current.json?key=b74942a353094200865162055181502&q=${text}`)
  .then((res) => res.json())
  .then((data) => {
    const { location , error} = data;
    if (error)
     return res.json({ cities: []});
    return res.json({ cities: [location.name]});
  });//await ждет, пока промис зарезолвится
});

app.get('/forecast', (req, res) => {
  const { city } = req.query;

  fetch(`https://api.apixu.com/v1/forecast.json?key=b74942a353094200865162055181502&q=${city}`)
  .then((res) => res.json())
  .then((data) => {
    const {
      location: {
        country
      },
      forecast: {
        forecastday: {
          0: {
            day: {
              avgtemp_c: temperature,
              avghumidity: cloud,
              condition: {
                text: condition,
                icon: conditionIcon
              }
            }
          }
        }
      }
    } = data;

    return res.json({ weather:
      {
        country,
        temperature,
        cloud,
        condition,
        conditionIcon
      }
    });
  });
});

app.get('/weather', (req, res) => {
  const { city } = req.query;

  fetch(`https://api.apixu.com/v1/current.json?key=b74942a353094200865162055181502&q=${city}`)
  .then((res) => res.json())
  .then((data) => {
    const {
      location: {
        country
      },
      current: {
        temp_c: temperature,
        cloud,
        condition: {
          text: condition,
          icon: conditionIcon
        }
      }
    } = data;

    return res.json({ weather:
      {
        country,
        temperature,
        cloud,
        condition,
        conditionIcon
      }
    });
  });
});

app.get('*', (req, res) => res.sendFile(`${__dirname}/dist/index.html`));
app.listen(port, () =>
  console.log(`App started successfully on port ${port} ...`)
);
