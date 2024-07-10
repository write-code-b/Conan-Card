const express = require('express');
const router = express.Router();

const card_controller = require("../controllers/cardController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET request for list of all Card.
router.get("/cards", card_controller.card_list);

module.exports = router;
