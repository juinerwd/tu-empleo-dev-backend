const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');

const app = express();

// Settings
// app.set('port', process.env.PORT || 4001);

// Middlewares
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname);
    }
});

const uploader = multer({ storage });
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/typescontracts', require('./routes/contract'));
app.use('/api/workingdays', require('./routes/workingday'));
app.use('/api/currencies', require('./routes/currency'));
app.use('/api/country', require('./routes/country'));
app.use('/api/vacancies', require('./routes/vacancy'));
app.use('/api/users', require('./routes/users'));
app.use('/api/uploads', uploader.single('curriculum'), require('./routes/upload'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/auth', require('./routes/auth'));


module.exports = app;