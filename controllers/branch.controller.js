const branchService = require("../service/branch.service");

class BranchController {
  async getBranches(req, res, next) {
    try {
      const branches = await branchService.getAllBranches();
      res.status(200).json(branches);
    } catch (error) {
      next(error);
    }
  }
  async newBranch(req, res, next) {
    try {
      const branch = await branchService.newBranch(req.body);
      res.status(201).json({ message: "Branch created.", branch });
    } catch (error) {
      next(error);
    }
  }
  async editBranch(req, res, next) {
    try {
      const { id: branchId } = req.params;
      const data = req.body;
      const updatedBranch = await branchService.editBranch(data, branchId);
      res.status(200).json({ message: "Branch updated.", ...updatedBranch });
    } catch (error) {
      next(error);
    }
  }
  async deleteBranch(req, res, next) {
    try {
      const { id: branchId } = req.params;
      const deletedBranch = await branchService.deleteBranch(branchId);
      res.status(200).json({ message: "Branch deleted.", ...deletedBranch });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BranchController();
