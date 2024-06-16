const database = require("./database");

const dataMapper = {
  async getAllCards() {
    const query = "SELECT * FROM card";
    const result = await database.query(query);
    return result.rows;
  },

  async getCard(cardId) {
    const query = `SELECT * FROM card WHERE id = ${cardId}`;
    const result = await database.query(query);
    return result.rows[0];
  },

  async getCardsByElement(element) {
    let query = `SELECT * FROM card WHERE element = '${element}'`;
    if (element === "null") {
      query = `SELECT * FROM card WHERE element IS NULL`;
    }
    const result = await database.query(query);
    return result.rows;
  },

  async getCardWithName(cardName) {
    let query = `SELECT * FROM card WHERE name = '${cardName}'`;
    const result = await database.query(query);
    return result.rows[0];
  },
};

module.exports = dataMapper;
