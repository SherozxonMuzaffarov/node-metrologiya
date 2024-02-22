const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');
const userValidations = require('../validators/userValidations');

router.post('/register', userValidations.register, userController.register);
router.post('/login', userValidations.login, userController.login);

router.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected route.' });
});

module.exports = router;
