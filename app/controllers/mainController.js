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

  addCardInSession: async (req, res) => {
    const cardName = req.params.cardName;

    if (!req.session.deck) {
      req.session.deck = [];
    }
    if (req.session.deck.find((card) => card.name === cardName)) {
      console.log("found card " + cardName);
      // fait rien;
    } else {
      if (
        req.session.deck.length < 5 /*&&
      req.session.deck.find((card) => card.name !== cardName)*/
      ) {
        try {
          const card = await dataMapper.getCardWithName(cardName);

          req.session.deck.push(card);
          console.log("deck : ");
          req.session.deck.forEach((card) => {
            console.log(card);
          });
        } catch (error) {
          console.error(error);
          res
            .status(500)
            .send(`An error occured with the database :\n${error.message}`);
        }
      }
    }

    res.redirect("/");
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
