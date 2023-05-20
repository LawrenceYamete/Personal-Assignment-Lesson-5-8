const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/employees');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.post('/', contactsController.createEmployee);

router.put('/:id', contactsController.updateEmployee);

router.delete('/:id', contactsController.deleteEmployee);

module.exports = router;