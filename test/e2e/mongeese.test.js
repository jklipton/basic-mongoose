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
        facts: ['each meerkats stripes are unique']
    };

    it('saves and gets mongoose', () => {
        return request.post('/mongeese')
            .send(indian)
            .then(({ body }) => {
                assert.deepInclude(body, indian);
                indian = body;
            });
    });

    const roundTrip = doc => JSON.parse(JSON.stringify(doc.toJSON()));

    it('gets a mongoose by ID', () => {
        return Mongoose.create(meerkat).then(roundTrip)
            .then(saved => {
                meerkat = saved;
                return request.get(`/mongeese/${meerkat._id}`);
            })
            .then(({ body }) => {
                assert.deepEqual(body, meerkat);
            });
    });

    it('updates a mongoose', () => {
        meerkat.facts[1] = 'meerkats sometimes share their burrow with squirrels';

        return request.put(`/mongeese/${meerkat._id}`)
            .send(meerkat)
            .then(({ body }) => {
                assert.deepEqual(body, meerkat);
                return Mongoose.findById(meerkat._id).then(roundTrip);
            })
            .then(updated => {
                assert.deepEqual(updated, meerkat);
            });
    });

    it('deletes a mongoose :(', () => {
        return request.delete(`/mongeese/${meerkat._id}`)
            .then(() => {
                return Mongoose.findById(meerkat._id);
            })
            .then(found => {
                assert.isNull(found);
            });
    });

    it('returns 404 on get of non-existent id', () => {
        return request.get(`/mongeese/${meerkat._id}`)
            .then(response => {
                assert.equal(response.status, 404);
            });
    });

});