const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const categoryController = require('../controllers/categoryController');
const validations = require('../validators/universalValidator')

router.get('/all', authMiddleware, categoryController.getAll)
router.get('/one/:id', authMiddleware,  categoryController.getOne)
router.post('/create', authMiddleware, validations.validate, categoryController.create)
router.patch('/update/:id', authMiddleware, validations.validate, categoryController.update)
router.delete('/delete/:id', authMiddleware, categoryController.delete)

module.exports = router;