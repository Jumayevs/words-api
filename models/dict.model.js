const { Schema, model } = require("mongoose");

const dictSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["historical", "modern"],
      default: "historical",
    },
    name: { type: String, required: true },
    desc: { type: String },
    pic: { type: String },
  },
  { timestamps: true }
);

module.exports = model("Dicts", dictSchema);
