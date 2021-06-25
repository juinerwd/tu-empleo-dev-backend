const { Schema, model } = require('mongoose');

const vacancySchema = new Schema({
    title: {
        type: 'string',
        required: true
    },
    description: {
        type: 'string',
        required: true
    },
    v_company: {
        type: 'string',
    },
    experience:{
        type: 'string',
        required: true
    },
    salary: {
        type: 'string',
        required: true
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Country',
        required: true
    },
    typeCurrency: {
        type: Schema.Types.ObjectId,
        ref: 'Currency',
        required: true
    },
    technologies: [{
        type: Object,
        required: true
    }],
    type_contract: {
        type: Schema.Types.ObjectId,
        ref: 'Contract',
        required: true
    },
    type_workingday: {
        type: Schema.Types.ObjectId,
        ref: 'Workingday',
        required: true
    },
    state: {
        type: Boolean,
        default: true
    },
    startDate: {
        type: Date,
        required: true
    },
    finishDate: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

vacancySchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.vid = _id;
    return object;
});

module.exports = model('Vacancy', vacancySchema);