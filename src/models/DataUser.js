const { Schema, model } = require('mongoose');

const profileSchema = new Schema({
    about_me: {
        type: String,
    },
    years_experience: {
        type: String,
    },
    portafolio_url: {
        type: String,
    },
    studies: {
        type: String
    },
    skills: {
        type: String
    },
    featured_projects: {
        type: String
    },
    certifications: {
        type: String
    },
    tools_technologies: {
        type: String
    },
    cv: {
        type: String
    },
    languages: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, { timestamps: true });

profileSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.profile_id = _id;
    return object;
});

module.exports = model('Profile', profileSchema);