const { response } = require('express');

const Vacancy = require('../models/Vacancy');

// Obteniendo todas las vacantes de la dase de datos
const getVacancies = async (req, res = response) => {
    const vacancies = await Vacancy.find().populate('user','fullName');

    res.status(200).json({
        ok: true,
        vacancies
    })
}

// Crear una nueva vacante
const createVacancy = async (req, res) => {

    const newVacancy = new Vacancy(req.body);

    try {

        newVacancy.user = req.uid;
        const vacancySaved = await newVacancy.save();

        res.status(200).json({
            ok: true,
            message: 'Vacante creada',
            vacante: vacancySaved
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Ha habido un error'
        });
    }
}

// Obeteniendo un solo registro de nuestra colección de vacantes
const getVacancy = async (req, res) => {
    const vacancy = await Vacancy.findById(req.params.id);

    res.status(200).json({
        ok: true,
        vacancy
    })
}

// Actualizando un registro de nuestra colección de vacantes
const updateVacancy = async (req, res) => {

    const vacanteId = req.params.id;
    const userId = req.uid;

    try {

        const vacancy = await Vacancy.findById(vacanteId);

        if (!vacancy) {
            return res.status(404).json({
                ok: false,
                message: 'No se encontro la vacante'
            });
        }

        if (vacancy.user.toString() !== userId) {
            return res.status(401).json({
                ok: false,
                message: 'No tienes permisos para editar esta vacante'
            });
        }

        const newVacancy = {
            ...req.body,
            user: userId
        }

        const vacancyUpdated = await Vacancy.findOneAndUpdate(vacanteId, newVacancy, { new: true });

        res.status(200).json({
            ok: true,
            message: 'Vacante actualizada exitosamente',
            vacancy: vacancyUpdated
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Ha habido un error'
        });
    }
}

// Eliminando un registro de nuestra colección de vacantes
const deleteVacancy = async (req, res) => {
    const vacanteId = req.params.id;
    const userId = req.uid;

    try {
        
        const vacancy = await Vacancy.findById(vacanteId);

        if (!vacancy) {
            return res.status(404).json({
                ok: false,
                message: 'No se encontro la vacante'
            });
        }

        if (vacancy.user.toString() !== userId) {
            return res.status(401).json({
                ok: false,
                message: 'No tienes permisos para eliminar esta vacante'
            });
        }

        await Vacancy.findByIdAndDelete(vacanteId);

        res.status(200).json({
            ok: true,
            message: 'Vacante eliminada exitosamente',
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Ha habido un error'
        });
    }
}

module.exports = {
    getVacancies,
    createVacancy,
    getVacancy,
    updateVacancy,
    deleteVacancy
};