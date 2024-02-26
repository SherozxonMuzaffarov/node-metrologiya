const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const metrologyController = require('../controllers/metrologyController');
const validations = require('../validators/universalValidator')

router.get('/all', authMiddleware, metrologyController.getAll)
router.get('/one/:id', authMiddleware,  metrologyController.getOne)
router.post('/create', authMiddleware, validations.validate, metrologyController.create)
router.put('/update/:id', authMiddleware, validations.validate, metrologyController.update)
router.delete('/delete/:id', authMiddleware, metrologyController.delete)

module.exports = router;