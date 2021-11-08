const express = require('express');
const router = express.Router();
const meController = require('../app/controllers/MeController');


router.post('/:id/change-password', meController.changePassword);
router.post('/:id/edit', meController.editUser);
router.put('/:id/block', meController.changeBlockUser);
router.get('/user-management', meController.getUser);
router.get('/stored/courses', meController.storeMusic);
router.get('/trash/courses', meController.trashMusic);

module.exports = router;