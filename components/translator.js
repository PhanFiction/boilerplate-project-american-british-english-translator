const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require('./british-only.js');

class Translator {
  constructor() {
    this.americanBritishDict = {
      ...americanOnly,
      ...americanToBritishSpelling,
    };

    this.britishAmericanDict = {
      ...britishOnly,
      ...this.reverseObj(americanToBritishSpelling),
    };

    this.americanToBritishTitles = americanToBritishTitles;
    this.britishToAmericanTitles = this.getBritishToAmericanTitles();
  }

  getBritishToAmericanTitles() {
    const britishToAmericanTitles = {};
    for (const [key, value] of Object.entries(americanToBritishTitles)) {
      britishToAmericanTitles[value] = key;
    }
    return britishToAmericanTitles;
  }

  translateAmericanToBritish(text) {
    return this.translate(text, 'american-to-british');
  }

  translateBritishToAmerican(text) {
    return this.translate(text, 'british-to-american');
  }

  translate(text, translationType) {
    const lowerCaseText = text.toLowerCase();
    const titles = translationType == 'american-to-british' ? this.americanToBritishTitles : this.britishToAmericanTitles;
    const dict = translationType == 'american-to-british' ? this.americanBritishDict : this.britishAmericanDict;
    let translated;

    translated = this.translateTitles(lowerCaseText, text, translated, titles);
    translated = translated != null ? translated : text;

    translated = this.changeTime(translated, lowerCaseText, translationType);

    for (const [key, value] of Object.entries(dict)) {
      const regexPatterns = [
        new RegExp(`${key} `, 'gi'),
        new RegExp(`${key}[^A-Za-z]`, 'gi'),
        new RegExp(`${key}$`, 'gi')
      ];
    
      if (regexPatterns.some(pattern => pattern.test(lowerCaseText))) {
        translated = translated.replace(new RegExp(key, 'gi'), `${this.highlight(value)}`);
      }
    }

    return translated != null ? translated : text;
  }

  changeTime(translatedText, lowerCaseText, timeType) {
    const timeRegex = timeType === 'american-to-british' ? /([1-9]|1[012]):[0-5][0-9]/g : /([1-9]|1[012]).[0-5][0-9]/g;
    const changeTime = lowerCaseText.match(timeRegex);

    if (changeTime) {
      changeTime.forEach(time => {
        if (timeType === 'american-to-british') {
          translatedText = translatedText.replace(time, `${this.highlight(time.replace(':', '.'))}`);
        } else {
          translatedText = translatedText.replace(time, `${this.highlight(time.replace('.', ':'))}`);
        }
      });
    }
    return translatedText;
  }

  translateTitles(lowerCaseText, text, translated, titles) {
    for (const [key, value] of Object.entries(titles)) {
      if (lowerCaseText.includes(key)) {
        translated = text.replace(new RegExp(key, 'i'), this.highlight(this.capitalizeFirstLetter(value)));
      }
    }
    return translated;
  }

  capitalizeFirstLetter(word) {
    return word[0].toUpperCase() + word.slice(1);
  }

  reverseObj(obj) {
    const flipped = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) flipped[obj[key]] = key;
    }
    return flipped;
  }

  highlight(text) {
    return `<span class="highlight">${text}</span>`;
  }
}

module.exports = Translator;