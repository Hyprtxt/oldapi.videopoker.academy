"use strict";
const { getNewCards } = require("../deck");
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    beforeCreate: (data) => {
      console.log("beforeCreate", data);
      const cards = getNewCards();
      data.User = data.User || { id: 1 };
      // if (data.User.id === undefined) {
      //   const eyedee = data.User
      //   data.User = {}
      //   data.User.Id = eyedee
      //   // data.User.Credits = data.User.Credits - 5;
      // }
      data.Deck = cards;
      data.Hand = cards.slice(0, 5);
      data.Holds = [null, null, null, null, null];
    },
    beforeUpdate: (params, data) => {
      data.Done = true;
    },
  },
};
