const express = require('express');
const router = express.Router();

const musicsController = require('../app/controllers/MusicsController');

router.post('/create', musicsController.create);
router.get('/:id/edit', musicsController.edit);
router.put('/:id', musicsController.update);
router.patch('/:id/restore', musicsController.restore);
router.delete('/:id', musicsController.destroy);
router.delete('/:id/force', musicsController.forceDestroy);
router.get('/:slug', musicsController.show);


module.exports = router;