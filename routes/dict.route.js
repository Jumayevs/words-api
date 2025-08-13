const router = require("express").Router();
const dictController = require("../controllers/dict.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/get", dictController.getDicts);
router.post("/new", authMiddleware, dictController.createDict);
router.put("/edit/:id", authMiddleware, dictController.updateDict);
router.delete("/delete/:id", authMiddleware, dictController.deleteDict);

module.exports = router;
