const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();


const sentenceFormat = (text) => `<span class="highlight">${text}</span>`

suite('Unit Tests', () => {

  suite('Translating from American to British', () => {

    test("Mangoes are my favorite fruit.", () => {
      const sentence = translator.translateAmericanToBritish('Mangoes are my favorite fruit.');
      const correctWord = sentenceFormat("favourite");
      assert.equal(sentence, `Mangoes are my ${correctWord} fruit.`);
    });

    test("I ate yogurt for breakfast.", () => {
      const sentence = translator.translateAmericanToBritish('I ate yogurt for breakfast.');
      const correctWord = sentenceFormat("yoghurt");
      assert.equal(sentence, `I ate ${correctWord} for breakfast.`);
    });

    test("We had a party at my friend's condo.", () => {
      const sentence = translator.translateAmericanToBritish("We had a party at my friend's condo.");
      const correctWord = sentenceFormat("flat");
      assert.equal(sentence, `We had a party at my friend's ${correctWord}.`);
    });

    test("Can you toss this in the trashcan for me?", () => {
      const sentence = translator.translateAmericanToBritish("Can you toss this in the trashcan for me?");
      const correctWord = sentenceFormat("bin");
      assert.equal(sentence, `Can you toss this in the ${correctWord} for me?`);
    });

    test("The parking lot was full.", () => {
      const correctWord = sentenceFormat("car park")
      const sentence = translator.translateAmericanToBritish("The parking lot was full.");
      assert.equal(sentence, `The ${correctWord} was full.`);
    });
    
    test("Like a high tech Rube Goldberg machine.", () => {
      const correctWord = sentenceFormat('Heath Robinson device');
      const sentence = translator.translateAmericanToBritish("Like a high tech Rube Goldberg machine.");
      assert.equal(sentence, `Like a high tech ${correctWord}.`);
    });
    
    test("To play hooky means to skip class or work.", () => {
      const correctWord = sentenceFormat("bunk off");
      const sentence = translator.translateAmericanToBritish("To play hooky means to skip class or work.");
      assert.equal(sentence, `To ${correctWord} means to skip class or work.`);
    });
    
    test("No Mr. Bond, I expect you to die.", () => {
      const correctWord = sentenceFormat("Mr");
      const sentence = translator.translateAmericanToBritish("No Mr. Bond, I expect you to die.");
      assert.equal(sentence, `No ${correctWord} Bond, I expect you to die.`);
    });
    
    test("Dr. Grosh will see you now.", () => {
      const correctWord = sentenceFormat('Dr')
      const sentence = translator.translateAmericanToBritish("Dr. Grosh will see you now.");
      assert.equal(sentence, `${correctWord} Grosh will see you now.`);
    });
    
    test("Lunch is at 12:15 today.", () => {
      const correctWord = sentenceFormat("12.15");
      const sentence = translator.translateAmericanToBritish("Lunch is at 12:15 today.");
      assert.equal(sentence, `Lunch is at ${correctWord} today.`);
    });

  }) 

  suite('Translating from British to American', () => {

    test("We watched the footie match for a while.", () => {
      const sentence = translator.translateBritishToAmerican('We watched the footie match for a while.');
      const correctWord = sentenceFormat("soccer");
      assert.equal(sentence, `We watched the ${correctWord} match for a while.`);
    });

    test("Paracetamol takes up to an hour to work.", () => {
      const sentence = translator.translateBritishToAmerican('Paracetamol takes up to an hour to work.');
      const correctWord = sentenceFormat("Tylenol");
      assert.equal(sentence, `${correctWord} takes up to an hour to work.`);
    });

    test("First, caramelise the onions.", () => {
      const sentence = translator.translateBritishToAmerican('First, caramelise the onions.');
      const correctWord = sentenceFormat("caramelize");
      assert.equal(sentence, `First, ${correctWord} the onions.`);
    });

    test("I spent the bank holiday at the funfair.", () => {
      const sentence = translator.translateBritishToAmerican('I spent the bank holiday at the funfair.');
      const correctWord = sentenceFormat("public holiday");
      const correctWord2 = sentenceFormat("carnival")
      assert.equal(sentence, `I spent the ${correctWord} at the ${correctWord2}.`);
    });

    test("I had a bicky then went to the chippy.", () => {
      const sentence = translator.translateBritishToAmerican('I had a bicky then went to the chippy.');
      const correctWord1 = sentenceFormat("cookie");
      const correctWord2 = sentenceFormat("fish-and-chip shop");
      assert.equal(sentence, `I had a ${correctWord1} then went to the ${correctWord2}.`);
    });

    test("I've just got bits and bobs in my bum bag.", () => {
      const sentence = translator.translateBritishToAmerican("I've just got bits and bobs in my bum bag.");
      const correctWord1 = sentenceFormat("odds and ends");
      const correctWord2 = sentenceFormat("fanny pack");
      assert.equal(sentence, `I've just got ${correctWord1} in my ${correctWord2}.`);
    });

    test("The car boot sale at Boxted Airfield was called off.", () => {
      const sentence = translator.translateBritishToAmerican("The car boot sale at Boxted Airfield was called off.");
      const correctWord = sentenceFormat("swap meet");
      assert.equal(sentence, `The ${correctWord} at Boxted Airfield was called off.`);
    });

    test("Have you met Mrs Kalyani?", () => {
      const sentence = translator.translateBritishToAmerican("Have you met Mrs Kalyani?");
      const correctWord = sentenceFormat("Mrs.");
      assert.equal(sentence, `Have you met ${correctWord} Kalyani?`);
    });

    test("Prof Joyner of King's College, London.", () => {
      const sentence = translator.translateBritishToAmerican("Prof Joyner of King's College, London.");
      const correctWord = sentenceFormat("Prof.");
      assert.equal(sentence, `${correctWord} Joyner of King's College, London.`);
    });

    test("Tea time is usually around 4 or 4.30.", () => {
      const sentence = translator.translateBritishToAmerican("Tea time is usually around 4 or 4.30.");
      const correctWord = sentenceFormat("4:30");
      assert.equal(sentence, `Tea time is usually around 4 or ${correctWord}.`);
    });
  });

  suite('Translating from British to American', () => {

    test("Translate 'Have you met Mrs Kalyani?' to American English", () => {
      const sentence = translator.translateBritishToAmerican('Have you met Mrs Kalyani?');
      const correctWord = sentenceFormat("Mrs.");
      assert.equal(sentence, `Have you met ${correctWord} Kalyani?`);
    });

    test("Translate 'Prof Joyner of King's College, London.' to American English", () => {
      const sentence = translator.translateBritishToAmerican("Prof Joyner of King's College, London.");
      const correctWord = sentenceFormat("Prof.");
      assert.equal(sentence, `${correctWord} Joyner of King's College, London.`);
    });

    test("Translate 'Tea time is usually around 4 or 4.30.' to American English", () => {
      const sentence = translator.translateBritishToAmerican("Tea time is usually around 4 or 4.30.");
      const correctWord = sentenceFormat("4:30");
      assert.equal(sentence, `Tea time is usually around 4 or ${correctWord}.`);
    });
});

suite('Highlighting Translations', () => {

    test("Highlight translation in 'Mangoes are my favorite fruit.'", () => {
      const sentence = translator.translateAmericanToBritish('Mangoes are my favorite fruit.');
      const highlightedWord = sentenceFormat("favourite");
      assert.equal(sentence, `Mangoes are my ${highlightedWord} fruit.`);
    });

    test("Highlight translation in 'I ate yogurt for breakfast.'", () => {
      const sentence = translator.translateAmericanToBritish('I ate yogurt for breakfast.');
      const highlightedWord = sentenceFormat("yoghurt");
      assert.equal(sentence, `I ate ${highlightedWord} for breakfast.`);
    });

    test("Highlight translation in 'We watched the footie match for a while.'", () => {
      const sentence = translator.translateBritishToAmerican('We watched the footie match for a while.');
      const highlightedWord = sentenceFormat("soccer");
      assert.equal(sentence, `We watched the ${highlightedWord} match for a while.`);
    });

    test("Highlight translation in 'Paracetamol takes up to an hour to work.'", () => {
      const sentence = translator.translateBritishToAmerican('Paracetamol takes up to an hour to work.');
      const highlightedWord = sentenceFormat("Tylenol");
      assert.equal(sentence, `${highlightedWord} takes up to an hour to work.`);
    });
  });

});
