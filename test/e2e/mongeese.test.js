const { assert } = require('chai');
const request = require('./request');
const Mongoose = require('../../lib/models/Mongoosey');
const mongoose = require('mongoose');

describe('Mongoose API', () => {

    before(() => {
        return mongoose.connection.dropCollection('mongeese')
            .catch(err => {
                if(err.codeName !== 'NamespaceNotFound') throw err;
            });
    });

    let indian = {
        species: 'Indian grey',
        continent: 'Asia',
        sizeCm: 45,
        weightKg: 1.7,
        facts: ['state animal of Chandigarh', 'Nevlaa in Hindi'],
        conservation: 'LC'
    };

    let meerkat = {
        species: 'Suricata suricatta',
        continent: 'Africa',
        sizeCm: 50,
        weightKg: 2.5,
        facts: ['each meerkats stripes are unique', 'meerkats sometimes share their burrow with squirrels']
    };

    it('saves a mongoose', () => {
        return request.post('/mongeese')
            .send(indian)
            .then(({ body }) => {
                assert.deepEqual(body, join(body, indian));
                indian = body;
            });
    });

});