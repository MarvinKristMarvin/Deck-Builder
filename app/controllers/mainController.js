const dataMapper = require("../dataMapper.js");

const mainController = {
  homePage: async (req, res) => {
    try {
      const cards = await dataMapper.getAllCards();
      res.render("cardList", {
        cards,
        title: "Liste des cartes",
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send(`An error occured with the database :\n${error.message}`);
    }
  },

  cardPage: async (req, res) => {
    try {
      const cardId = Number(req.params.id);
      const card = await dataMapper.getCard(cardId);
      res.render("cardInfo", {
        card,
        title: "Informations sur la carte",
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send(`An error occured with the database :\n${error.message}`);
    }
  },
};

module.exports = mainController;
