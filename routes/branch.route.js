const router = require("express").Router();
const branchController = require("../controllers/branch.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/get", branchController.getBranches);
router.post("/new", authMiddleware, branchController.newBranch);
router.put("/edit/:id", authMiddleware, branchController.editBranch);
router.delete("/delete/:id", authMiddleware, branchController.deleteBranch);

module.exports = router;
