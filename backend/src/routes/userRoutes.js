const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');
const validations = require('../validators/universalValidator')

router.get('/all', authMiddleware, userController.getAll)
router.get('/one/:id', authMiddleware, userController.getOne)
router.get('/userID', authMiddleware, userController.getUserId)
router.get('/identify-user', authMiddleware, userController.identifyUser)
router.post('/create', authMiddleware, validations.validate, userController.create)
router.patch('/update/:id', authMiddleware, validations.validate, userController.update)
router.delete('/delete/:id', authMiddleware, userController.delete)

module.exports = router;