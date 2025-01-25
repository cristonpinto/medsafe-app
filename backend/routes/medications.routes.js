const express = require('express');
const router = express.Router();
const medicationsController = require('../controllers/medications.controller');

router.post('/', medicationsController.createMedication);
router.get('/:patientId', medicationsController.getMedications);
router.put('/:id', medicationsController.updateMedication);
router.delete('/:id', medicationsController.deleteMedication);

module.exports = router;