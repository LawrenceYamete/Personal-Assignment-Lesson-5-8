const express = require('express');
const router = express.Router();

const employeesController = require('../controllers/employee');

router.get('/', employeesController.getAll);

router.get('/:id', employeesController.getSingle);

router.post('/', employeesController.createContact);

router.put('/:id', employeesController.updateContact);

router.delete('/:id', employeesController.deleteContact);

module.exports = router;