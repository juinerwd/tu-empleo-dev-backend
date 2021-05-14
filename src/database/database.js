const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://localhost/tuvacantetest';

const dbConnection = async () => {

    try {
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        
        console.log('DB Online');
    } catch (error) {
        throw new Error('Error al momento de iniciar la BD');
    }
}

module.exports = {
    dbConnection
}