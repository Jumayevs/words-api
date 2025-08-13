const DictError = require("../errors/dict.error");
const dictModel = require("../models/dict.model");
const fileService = require("./file.service");

class DictService {
  async getAllDicts() {
    return await dictModel.find();
  }
  async createDictionary(dict, pic) {
    const existDict = await dictModel.findOne({ name: dict.name });
    if (existDict) {
      throw new DictError.duplicateDictError(
        "A dictionary exists with this name"
      );
    }
    const savedImg = fileService.saveFile(pic);

    const newDict = await dictModel.create({ ...dict, pic: savedImg });
    return newDict;
  }
  async updateDictionary(dict, dictId) {
    const updatedDict = await dictModel.findByIdAndUpdate(dictId, dict, {
      new: true,
    });
    return updatedDict;
  }
  async deleteDictionary(dictId) {
    return await dictModel.findByIdAndDelete(dictId);
  }
}


module.exports = new DictService();
