const express = require('express');
const router = express.Router();

const schoolController = require('../controllers/schoolController');

// Routes
router.post('/addSchool', schoolController.addSchool);
router.get('/listSchools', schoolController.listSchools);

module.exports = router;