const Card = require("../models/card");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// Display list of all cards.
exports.card_list = asyncHandler(async (req, res, next) => {
  const query = req.query;
  if (Object.entries(query).length === 0) {
    const allCards = await Card.find({});
    res.json(allCards);
  } else {
    const regex = (pattern) => new RegExp(`.*${pattern}.*`);
    const filter = [query].map((k) => {
      return {
        ...(k.name && { name: { $regex: regex(k.name) } }),
        ...(k.code && { code: { $in: k.code } }),
        ...(k.color && { color: { $in: k.color } }),
        ...(k.category && { category: { $in: k.category } }),
        ...(k.rarity && { rarity: { $in: k.rarity } }),
      };
    });
    const filterCards = await Card.find(filter[0]);
    res.json(filterCards);
  }
});
