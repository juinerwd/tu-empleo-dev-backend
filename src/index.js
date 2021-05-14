require('dotenv').config();
const { dbConnection } = require('./database/database');

const app = require('./app');

// Base de datos
dbConnection();

async function main() {
    await app.listen(app.get('port'));
    console.log('server on port', app.get('port'));
}

main();