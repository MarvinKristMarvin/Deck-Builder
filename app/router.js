const express = require("express");
const router = express.Router();

const mainController = require("./controllers/mainController");
const searchController = require("./controllers/searchController");

router.get("/", mainController.homePage);
router.get("/search", searchController.searchPage);
router.get("/card/:id", mainController.cardPage);
router.get("/search/:element", searchController.searchByElement);
router.get("/add/:cardName", mainController.addCardInSession);
router.get("/deck", mainController.deckPage);

module.exports = router;
