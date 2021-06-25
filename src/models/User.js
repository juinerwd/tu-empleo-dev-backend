const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone_number: {
        type: Number,
    },
    company: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    country: {
        type: Schema.Types.ObjectId,
        ref: 'Country',
        required: true
    },
    policy: {
        type: Boolean,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'DEV_ROLE'
    },
    profile_photo: {
        type: String,
        default: 'https://res.cloudinary.com/dqpdnjjs5/image/upload/v1622233709/ultjeskqe8w4rj50paun.png'
    }
}, { timestamps: true });

userSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('User', userSchema);