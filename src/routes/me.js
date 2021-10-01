const express = require('express');
const router = express.Router();
const meController = require('../app/controllers/MeController');

router.get('/stored/courses', meController.storeMusic);
router.get('/trash/courses', meController.trashMusic);

module.exports = router;