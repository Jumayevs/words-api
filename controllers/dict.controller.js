const dictService = require("../service/dict.service");

class DictController {
  async getDicts(req, res, next) {
    const dicts = await dictService.getAllDicts();
    res.status(200).json(dicts);
  }

  async createDict(req, res, next) {
    try {
      const newDict = await dictService.createDictionary(
        req.body,
        req.files.pic
      );
      res.status(201).json({ message: "Dictionary created.", newDict });
    } catch (error) {
      next(error);
    }
  }
  async updateDict(req, res, next) {
    try {
      const dictId = req.params.id;
      const updatedDict = await dictService.updateDictionary(req.body, dictId);
      res.status(200).json({ message: "Dictionary updated.", updatedDict });
    } catch (error) {
      next(error);
    }
  }
  async deleteDict(req, res, next) {
    const dictId = req.params.id;
    const deletedDict = await dictService.deleteDictionary(dictId);
    res.status(200).json({ message: "Dictionary deleted.", deletedDict });
  }
}

module.exports = new DictController();
