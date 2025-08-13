const branchModel = require("../models/branch.model");

class BranchService {
  async getAllBranches() {
    return await branchModel.find().populate("dict");
  }
  async newBranch(body) {
    const newBranch = await branchModel.create({ ...body });
    return newBranch;
  }
  async editBranch(data, branchId) {
    return await branchModel.findByIdAndUpdate(branchId, data, { new: true });
  }
  async deleteBranch(branchId) {
    return await branchModel.findByIdAndDelete(branchId);
  }
}

module.exports = new BranchService();
