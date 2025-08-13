const { Schema, model } = require("mongoose");

const wordSchema = new Schema({
  category: { type: Schema.ObjectId, ref: "Category" },
  name: { type: String, required: true },
  desc: { type: String, required: true },
  img: { type: String },
});

module.exports = model("Word", wordSchema);
