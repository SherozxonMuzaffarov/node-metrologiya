const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const metrologySkladController = require("../controllers/metrologySkladController");
const validations = require("../validators/universalValidator");

router.get('/all', authMiddleware, metrologySkladController.getAll)
router.get('/one/:id', authMiddleware, metrologySkladController.getOne)
router.post('/create', authMiddleware, validations.validate, metrologySkladController.create)
router.patch('/update/:id', authMiddleware, validations.validate, metrologySkladController.update)
router.delete('/delete/:id', authMiddleware, metrologySkladController.delete)

module.exports = router;
 