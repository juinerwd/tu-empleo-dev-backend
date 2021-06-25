const { response } = require('express');

const Currency = require('../models/Currency');

// Obteniendo todos los paises de la dase de datos
const getCurrencies = async (req, res = response) => {
    const currencies = await Currency.find();

    res.status(200).json({
        ok: true,
        currencies
    })
}

// Obeteniendo un solo registro de nuestra colección de paises
const getCurrency = async (req, res) => {
    const currency = await Currency.findById(req.params.id);

    res.status(200).json({
        ok: true,
        currency
    })
}

module.exports = {
    getCurrencies,
    getCurrency
};