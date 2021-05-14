require('dotenv').config();
const { dbConnection } = require('./database/database');

const app = require('./app');

// Base de datos
dbConnection();

async function main() {
    await app.listen(process.env.PORT);
    console.log('server on port', process.env.PORT);
}

main();