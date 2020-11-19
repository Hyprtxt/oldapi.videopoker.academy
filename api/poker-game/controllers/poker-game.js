"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
const { getNewCards } = require("../deck");
/**
 * A set of functions called "actions" for `poker-game`
 */

module.exports = {
  new: async (ctx, next) => {
    console.log(ctx.request.body, "MAKIN A GAME");
    if (ctx.request.body.User === undefined) {
      ctx.request.body.User = { id: 1 };
    }
    // ctx.request.body.Deck = getNewCards();
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services["poker-game"].create(data, { files });
    } else {
      entity = await strapi.services["poker-game"].create(ctx.request.body);
    }
    let payload = strapi.models["poker-game"];
    // console.log(payload);
    // payload.Hand = payload.Deck.slice(0, 5);
    return sanitizeEntity(entity, { model: payload });
  },
  draw: async (ctx) => {
    const { id } = ctx.params;
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services["poker-game"].update({ id }, data, {
        draw: true,
        files,
      });
    } else {
      entity = await strapi.services["poker-game"].update(
        { id },
        ctx.request.body
      );
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
