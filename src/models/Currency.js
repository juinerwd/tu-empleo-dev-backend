// Currency
const { Schema, model } = require('mongoose');

const currencySchema = new Schema({
    currency: {
        type: String,
        required: true,
        unique: true
    }
});

currencySchema.method('toJSON', function() {
    const { _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Currency', currencySchema);