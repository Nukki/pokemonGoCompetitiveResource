// Imports the Google Cloud client library
const language = require('@google-cloud/language');
const express = require('express');

const router = express.Router();

// Instantiates a client
const client = new language.LanguageServiceClient();


router.post('/', (req, res) => {
  const document = {
    content: req.body.text,
    type: 'PLAIN_TEXT',
  };

  client
    .analyzeSentiment({ document })
    .then((results) => {
      const sentiment = results[0].documentSentiment;
      const originalScore = sentiment.score;
      let parsedScore = '';
      if (originalScore > 0.25) {
        parsedScore = '+';
      } else if (originalScore < -0.25) {
        parsedScore = '-';
      } else {
        parsedScore = '~';
      }
      res.json({ sentiment: parsedScore });
    })
    .catch((err) => {
      console.error('ERROR:', err);
    });
});

router.post('/lol', (req, res) => {
  console.log(`Author: ${req.body.author}`);
  res.json(req.body);
});


module.exports = router;
