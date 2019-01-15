const express = require('express')
const models = require('../models/index');

const router = express.Router()

router.post('/new', function(req, res, next) {
    res.locals.connection.query('INSERT INTO users (nume, prenume, numeUtilizator, email, parola, descriere) VALUES ('+ req.body.name+','+req.body.prenume+');', function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});

// const studentsController = require('../controllers/StudentsController.js')

// router.get('/students', studentsController.findAll)
// router.get('/students/:id', studentsController.findOne)

// const teamsController = require('../controllers/TeamsController.js')

// router.get('/teams', teamsController.findAll)
// router.get('/teams/:id', teamsController.findOne)

module.exports = router