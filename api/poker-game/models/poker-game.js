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
      data.Deck = cards;
      data.Hand = cards.slice(0, 5);
      data.Holds = [null, null, null, null, null];
    },
    beforeUpdate: (params, data) => {
      data.Done = true;
      // No More null Allowed
      // if (data.Holds !== undefined && data.Holds.isArray()) {
      //   data.Holds = data.Holds.map((value) => (value === null ? false : true));
      // }
    },
  },
};
