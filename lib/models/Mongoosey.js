const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    species: {
        type: String,
        required: true, 
    },
    continent: {
        type: String,
        enum: ['Asia', 'Africa', 'Australia', 'Antarctica', 'North America', 'South America', 'Europe']
    },
    sizeCm: {
        type: Number,
        min: 1,
        max: 152
    },
    weightKg: {
        type: Number,
        min: 1,
        max: 10
    },
    facts: [{ type: String, maxlength: 100 }],
    conservation: {
        type: String,
        enum: ['EX', 'EW', 'CR', 'EN', 'VU', 'NT', 'LC']
    }
});

module.exports = mongoose.model('Mongoose', schema);