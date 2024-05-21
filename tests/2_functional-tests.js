const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');
const api = '/api/translate';

suite('Functional Tests', () => {

  suite('Testing american to british', () => {

    test('Mangoes are my favorite fruit', (done) => {
      chai
      .request(server)
      .post(api)
      .set('content-type', 'application/json')
      .send({ text: 'Mangoes are my favorite fruit.', locale: 'american-to-british' })
      .end((err, res) => {
        assert.equal(res.body.text, 'Mangoes are my favorite fruit.');
        assert.equal(res.body.translation, 'Mangoes are my <span class="highlight">favourite</span> fruit.');
        done();
      })
    })

    test('I ate yogurt for breakfast.', (done) => {
      chai
      .request(server)
      .post(api)
      .set('content-type', 'application/json')
      .send({ text: 'I ate yogurt for breakfast.', locale: 'american-to-british' })
      .end((err, res) => {
        assert.equal(res.body.text, 'I ate yogurt for breakfast.');
        assert.equal(res.body.translation, 'I ate <span class="highlight">yoghurt</span> for breakfast.');
        done();
      })
    })
  })

  suite('Testing british to american', () => {
    test('First, caramelise the onions.', (done) => {
      chai
      .request(server)
      .post(api)
      .set('content-type', 'application/json')
      .send({ text: 'First, caramelise the onions.', locale: 'british-to-american' })
      .end((err, res) => {
        assert.equal(res.body.text, 'First, caramelise the onions.');
        assert.equal(res.body.translation, 'First, <span class="highlight">caramelize</span> the onions.');
        done();
      })
    });
  })

  suite('Test other error', () => {

    test('With missing locale field', (done) => {
      chai
      .request(server)
      .post(api)
      .set('content-type', 'application/json')
      .send({ text: 'I ate yogurt for breakfast.' })
      .end((err, res) => {
        assert.equal(res.body.error, 'Required field(s) missing');
        done();
      });
    });
  
    test('With invalid locale field', (done) => {
      chai
      .request(server)
      .post(api)
      .set('content-type', 'application/json')
      .send({ text: 'I ate yogurt for breakfast.', locale: 'french-to-american' })
      .end((err, res) => {
        if (err) throw err
        assert.equal(res.body.error, 'Invalid value for locale field');
        done();
      });
    });

    test('No translation needed', (done) => {
      chai.request(server)
      .post(api)
      .set('content-type', 'application/json')
      .send({ text: 'These are not the droids your looking for.', locale: 'american-to-british' })
      .end((err, res) => {
        assert.equal(res.body.text,'These are not the droids your looking for.');
        assert.equal(res.body.translation,'Everything looks good to me!')
        done();
      });
    });

  })

});
