const dataMapper = require("../dataMapper.js");

const searchController = {
  searchPage: (req, res) => {
    res.render("search");
  },

  searchByElement: async (req, res) => {
    try {
      const cards = await dataMapper.getCardsByElement(req.query.element);
      res.render("searchedCards", { title: "Searched Cards", cards });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send(`An error occured with the database :\n${error.message}`);
    }
  },
};

module.exports = searchController;
