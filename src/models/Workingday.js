const { Schema, model } = require('mongoose');

const workingdaySchema = new Schema({
    code_workingday: {
        type: String,
        required: true,
        unique: true
    },
    workingday: {
        type: String,
        required: true,
        unique: true
    }
});

workingdaySchema.method('toJSON', function() {
    const { _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('workingdays', workingdaySchema);