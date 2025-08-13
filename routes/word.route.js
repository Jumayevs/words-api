const router = require("express").Router();
const wordController = require("../controllers/word.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/all", wordController.getWords);
router.get("/single/:wordId", wordController.getOne);
router.post("/new", authMiddleware, wordController.addWord);
router.put("/edit/:wordId", authMiddleware, wordController.editWord);
router.delete("/delete/:wordId", authMiddleware, wordController.deleteWord);

module.exports = router;
