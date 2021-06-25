const { response } = require('express');

const Workingday = require('../models/Workingday');

// Obteniendo todos los paises de la dase de datos
const getWorkingdays = async (req, res = response) => {
    const workingdays = await Workingday.find();

    res.status(200).json({
        ok: true,
        workingdays
    })
}

// Obeteniendo un solo registro de nuestra colección de paises
const getWorkingday = async (req, res) => {
    const working_day = await Workingday.findById(req.params.id);

    res.status(200).json({
        ok: true,
        working_day
    })
}

module.exports = {
    getWorkingdays,
    getWorkingday
};