'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const { locale, text } = req.body;

      // Check if text and locale are provided
      if (!locale || text === undefined) return res.json({ error: 'Required field(s) missing' });

      // Check if text is empty
      if (text.length < 1) return res.json({ error: 'No text to translate' });

      // Check if the locale is valid
      if (locale !== 'american-to-british' && locale !== 'british-to-american') return res.json({ error: 'Invalid value for locale field' });

      // Perform the translation
      let translation;
      if (locale === 'american-to-british') {
        translation = translator.translateAmericanToBritish(text);
      } else if (locale === 'british-to-american') {
        translation = translator.translateBritishToAmerican(text);
      }

      if (translation == text) translation = "Everything looks good to me!";

      // Return the translated text
      return res.json({
        text: text,
        translation: translation
      });
    });
};
