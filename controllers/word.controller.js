const wordService = require("../service/word.service");

class WordController {
  async getWords(req, res, next) {
    try {
      const words = await wordService.all();
      res.status(200).json(words);
    } catch (error) {
      next(error);
    }
  }
  async getOne(req, res, next) {
    try {
      const { wordId } = req.params;
      const word = await wordService.get(wordId);
      res.status(200).json(word);
    } catch (error) {
      next(error);
    }
  }
  async addWord(req, res, next) {
    try {
      const wordImg = req.files?.img;
      const data = req.body;
      const addedWord = await wordService.add(data, wordImg);
      res.status(200).json(addedWord);
    } catch (error) {
      next(error);
    }
  }
  async editWord(req, res, next) {
    try {
      const data = req.body;
      const { wordId } = req.params;
      const updatedWord = await wordService.edit(data, wordId);
      res.status(200).json(updatedWord);
    } catch (error) {
      next(error);
    }
  }
  async deleteWord(req, res, next) {
    try {
      const { wordId } = req.params;
      const deletedWord = await wordService.delete(wordId);
      res.status(200).json(deletedWord);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new WordController();
