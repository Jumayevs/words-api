const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  branch: { type: Schema.ObjectId, ref: "Branch" },
  name: { type: String, required: true },
});

module.exports = model("Category", categorySchema);
