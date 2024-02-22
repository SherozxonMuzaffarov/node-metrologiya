const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const measureController = require("../controllers/measureController");
const validations = require("../validators/universalValidator");

router.get('/all', authMiddleware, measureController.getAll)
router.get('/one/:id', authMiddleware, measureController.getOne)
router.post('/create', authMiddleware, validations.validate, measureController.create)
router.patch('/update/:id', authMiddleware, validations.validate, measureController.update)
router.delete('/delete/:id', authMiddleware, measureController.delete)

module.exports = router;
 