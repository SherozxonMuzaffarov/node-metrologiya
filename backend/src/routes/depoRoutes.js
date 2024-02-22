const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const depoController = require('../controllers/depoController');
const validations = require('../validators/universalValidator')

router.get('/all', authMiddleware, depoController.getAll)
router.get('/one/:id', authMiddleware, depoController.getOne)
router.post('/create', authMiddleware, validations.validate, depoController.create)
router.patch('/update/:id', authMiddleware, validations.validate, depoController.update)
router.delete('/delete/:id', authMiddleware, depoController.delete)

module.exports = router;