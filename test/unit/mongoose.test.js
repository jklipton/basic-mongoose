const { assert } = require('chai');
const Mongoose = require('../../lib/models/Mongoosey');

describe('Mongoose model', () => {

    it('valid good so good', () => {
        const data = {
            species: 'Indian grey',
            continent: 'Asia',
            sizeCm: 45,
            weightKg: 1.7,
            facts: ['state animal of Chandigarh', 'Nevlaa in Hindi'],
            conservation: 'LC'
        };

        const mongoose = new Mongoose(data);

        assert.deepEqual(mongoose.toJSON(), {
            _id: mongoose._id,
            ...data
        });

        assert.isUndefined(mongoose.validateSync());
    });

    it('required species, facts maxlength', () => {
        const mongoose = new Mongoose({ facts: ['IQqxydDz7MBUngbw0jIyndNxbk3Iv4aJyah3Cpv6s79UVrVj95YAv7Y6dFBeXPAgl8iAnz1veS3pAAuCeqm22McaTzubCrNVMgKdx'] });
        const { errors } = mongoose.validateSync();
        assert.equal(errors['species'].kind, 'required');
        assert.equal(errors['facts.0'].kind, 'maxlength');
    });

    it('continent, conservation, enum', () => {
        const extinct = new Mongoose({
            continent: 'Mars',
            conservation: 'Alive'
        });
        const { errors } = extinct.validateSync();
        assert.equal(errors['continent'].kind, 'enum');
        assert.equal(errors['conservation'].kind, 'enum');
    });

    it('size, weight, type and size', () => {
        const fat = new Mongoose({
            sizeCm: 'Mars',
            weightKg: 15
        });
        const { errors } = fat.validateSync();
        assert.equal(errors['sizeCm'].kind, 'Number');
        assert.equal(errors['weightKg'].kind, 'max');
    });

});