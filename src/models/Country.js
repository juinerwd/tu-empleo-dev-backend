const { Schema, model } = require('mongoose');

const countrySchema = new Schema({
    country_en: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true,
        unique: true
    },
    dial_code: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    }
});

countrySchema.method('toJSON', function() {
    const { _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Country', countrySchema);