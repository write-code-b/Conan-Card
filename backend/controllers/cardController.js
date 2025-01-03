const Card = require("../models/card");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// Display list of all cards.
exports.card_list = asyncHandler(async (req, res, next) => {
  const query = req.query;
  let sortFlag = false;
  let sortKeyword = "_id";
  let sortMethod = 1;

  if (Object.entries(query).length === 0) {
    const allCards = await Card.find({});
    res.json(allCards);
  } else {
    const regex = (pattern) => new RegExp(`.*${pattern}.*`);
    const filter = [query].map((k) => {
      if (k.sort) {
        sortFlag = true;
        sortKeyword = k.sort && k.sort.split("_")[0];
        sortMethod = k.sort && (k.sort.split("_")[1] === "high" ? "-1" : "1");
      }

      return {
        ...(k.name && { name: { $regex: regex(k.name) } }),
        ...(k.code && { code: { $in: k.code } }),
        ...(k.product !== "0" && { product_code: parseInt(k.product) }),
        ...(k.color && { color: { $regex: regex(k.color) } }),
        ...(k.category && { category: { $in: k.category } }),
        ...(k.rarity && { rarity: { $in: k.rarity } }),
      };
    });

    if (sortFlag) {
      const filterCards = await Card.find(filter[0]).sort({
        [sortKeyword]: parseInt(sortMethod),
      });
      res.json(filterCards);
    } else {
      const filterCards = await Card.find(filter[0]);
      res.json(filterCards);
    }
  }
});
