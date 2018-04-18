const router = require('express').Router();
const Mongoose = require('../models/Mongoosey');
const errorHandler = require('../error-handler');

module.exports = router
    .post('/', (req, res) => {
        Mongoose.create(req.body)
            .then(mongoose => res.json(mongoose))
            .catch(err => errorHandler(err, req, res));
    });