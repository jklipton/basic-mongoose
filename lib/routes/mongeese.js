const router = require('express').Router();
const Mongoose = require('../models/Mongoosey');
const errorHandler = require('../error-handler');

module.exports = router
    .post('/', (req, res) => {
        Mongoose.create(req.body)
            .then(mongoose => res.json(mongoose))
            .catch(err => errorHandler(err, req, res));
    })

    .get('/:id', (req, res) => {
        const { id } = req.params;

        Mongoose.findById(id)
            .lean()
            .then(mongoose => {
                if(!mongoose){
                    errorHandler({
                        status: 404,
                        error: `No mongoose at ${id}`
                    }, req, res);
                }
                else res.json(mongoose);
            })
            .catch(err => errorHandler(err, req, res));
    })

    .get('/', (req, res) => {
        Mongoose.find(req.query)
            .lean()
            .then(mongeese => res.json(mongeese))
            .catch(err => errorHandler(err, req, res));
    });