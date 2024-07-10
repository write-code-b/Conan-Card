const Card = require("../models/card");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// Display list of all cards.
exports.card_list = asyncHandler(async (req, res, next) => {
  const allCards = await Card.find({});

  res.json(allCards);
});
