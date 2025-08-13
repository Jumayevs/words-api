const uuidv4 = require("uuid").v4;
const fs = require("fs");
const path = require("path");
const BaseError = require("../errors/base.error");

class FileService {
  saveFile(file) {
    try {
      const fileName = uuidv4() + ".jpg";
      const staticDir = path.join(__dirname, "..", "static");
      const filePath = path.join(staticDir, fileName);
      if (!fs.existsSync(staticDir)) {
        fs.mkdirSync(staticDir, { recursive: true });
      }
      file.mv(filePath);
      return fileName;
    } catch (error) {
      throw new BaseError.BadRequest("An error occured while uploading file.");
    }
  }
}

module.exports = new FileService();
