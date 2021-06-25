const { Schema, model } = require('mongoose');

const candidateSchema = new Schema({
    candidate_name: {
        type: String,
        required: true
    },
    candidate_telephoneNumber: {
        type: String,
        required: true
    },
    candidate_email: {
        type: String,
        required: true
    },
    candidate_cv: {
        type: String,
        required: true
    },
    vacancy_name: {
        type: String,
        required: true
    },
    vacancy_id: {
        type: Schema.Types.ObjectId,
        ref: 'Vacancy',
        required: true
    },
    recruiter_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

candidateSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.cv_id = _id;
    return object;
});

module.exports = model('Candidate', candidateSchema);