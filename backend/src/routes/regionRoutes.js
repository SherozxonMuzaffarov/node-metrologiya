const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const regionController = require("../controllers/regionController");
const validations = require("../validators/universalValidator");

router.get('/all', authMiddleware, regionController.getAll)
router.get('/one/:id', authMiddleware, regionController.getOne)
router.post('/create', authMiddleware, validations.validate, regionController.create)
router.patch('/update/:id', authMiddleware, validations.validate, regionController.update)
router.delete('/delete/:id', authMiddleware, regionController.delete)

module.exports = router;
 