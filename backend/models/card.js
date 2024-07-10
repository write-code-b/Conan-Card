const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CardSchema = new Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  product: { type: String, required: true },
  color: { type: String, required: true },
  category: { type: String, required: true },
  rarity: { type: String, required: true },
  LP: { type: Number, required: true },
  level: { type: String, required: false },
  feature: { type: String, required: false },
  AP: { type: Number, required: false },
  effect: { type: String, required: false },
  img_url: { type: String, required: true },
});

// Export model.
module.exports = mongoose.model("Card", CardSchema, "card");
