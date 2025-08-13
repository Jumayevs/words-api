const wordModel = require("../models/word.model");

class WordService {
  async all() {
    return await wordModel.find().populate({
      path: "category",
      populate: {
        path: "branch",
        populate: {
          path: "dict",
        },
      },
    });
  }
  async get(wordId) {
    return await wordModel.findById(wordId);
  }
  async add(word, img) {
    const newWord = await wordModel.create({ ...word, img });
    return newWord;
  }
  async edit(word, wordId) {
    const editedWord = await wordModel.findByIdAndUpdate(wordId, word, {
      new: true,
    });
    return editedWord;
  }
  async delete(wordId) {
    return await wordModel.findByIdAndDelete(wordId);
  }
}
module.exports = new WordService();
