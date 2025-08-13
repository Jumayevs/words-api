const { Schema, model } = require("mongoose");

const branchSchema = new Schema({
  dict: { type: Schema.ObjectId, ref: "Dicts" },
  name: { type: String, required: true },
  pic: { type: String },
});

module.exports = model("Branch", branchSchema);
