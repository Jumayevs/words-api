const router = require("express").Router();
const categoryController = require("../controllers/category.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/get", categoryController.getCategory);
router.post("/new", authMiddleware, categoryController.newCategory);

module.exports = router;
