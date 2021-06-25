const { response } = require('express');

const Country = require('../models/Country');

// Obteniendo todos los paises de la dase de datos
const getCountries = async (req, res = response) => {
    const countries = await Country.find();

    res.status(200).json({
        ok: true,
        countries
    })
}

// Obeteniendo un solo registro de nuestra colección de paises
const getCountry = async (req, res) => {
    const country = await Country.findById(req.params.id);

    res.status(200).json({
        ok: true,
        country
    })
}

module.exports = {
    getCountries,
    getCountry
};