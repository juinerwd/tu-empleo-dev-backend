const { response } = require('express');

const Contract = require('../models/Contract');

// Obteniendo todos los paises de la dase de datos
const getContracts = async (req, res = response) => {
    const contracts = await Contract.find();

    res.status(200).json({
        ok: true,
        contracts
    })
}

// Obeteniendo un solo registro de nuestra colección de paises
const getContract = async (req, res) => {
    const contract = await Contract.findById(req.params.id);

    res.status(200).json({
        ok: true,
        contract
    })
}

module.exports = {
    getContracts,
    getContract
};