"use strict"
const { getNewCards } = require("../deck")
const { simpleStrategy } = require("../simple-strategy")
// const hash = require("object-hash");
const uuid = require("uuid")
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    beforeCreate: data => {
      console.log("beforeCreate", data)
      const cards = getNewCards()
      const hand = cards.slice(0, 5)
      data.User = data.User || { id: 1 }
      const cardsInPlay = cards.slice(0, 10).join("")
      // if (data.User.id === undefined) {
      //   const eyedee = data.User
      //   data.User = {}
      //   data.User.Id = eyedee
      //   // data.User.Credits = data.User.Credits - 5;
      // }

      // console.log(hash(cardsInPlay));
      // data.Hash = hash(cardsInPlay);
      data.uuid = uuid.v4()
      data.Deck = cards
      data.Hand = hand
      if (data.Mode === "casual") {
        data.Strategy = simpleStrategy(hand)
      }
      data.Holds = [null, null, null, null, null]
    },
    beforeUpdate: (params, data) => {
      data.Done = true
    },
  },
}
