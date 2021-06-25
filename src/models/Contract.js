const { Schema, model } = require('mongoose');

const contractSchema = new Schema({
    code_contract: {
        type: String,
        required: true,
        unique: true
    },
    contract: {
        type: String,
        required: true,
        unique: true
    }
});

contractSchema.method('toJSON', function() {
    const { _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('contracts', contractSchema);