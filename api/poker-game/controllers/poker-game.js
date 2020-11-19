"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
const { getNewCards } = require("../deck");
/**
 * A set of functions called "actions" for `poker-game`
 */

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

  new: async (ctx, next) => {
    console.log(ctx.request.body, "MAKIN A GAME");
    ctx.request.body.Deck = getNewCards();
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services["poker-game"].create(data, { files });
    } else {
      entity = await strapi.services["poker-game"].create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models["poker-game"] });
  },

  myGames: async (ctx, next) => {
    console.log("myGames", ctx, ctx.state);
    try {
      // ctx.body = 'ok';
      let entities = await strapi.services["poker-game"].find(ctx.query);
      return entities.map((entity) => {
        // console.log( entity )
        if (entity.User.id === ctx.state.user.id) {
          return sanitizeEntity(entity, { model: strapi.models["poker-game"] });
        }
      });
    } catch (err) {
      ctx.body = err;
    }
  },
};
