"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
const Poker = require("../poker");

/**
 * A set of functions called "actions" for `poker-game`
 */

module.exports = {
  play: async (ctx) => {
    let entity;
    // console.log(
    //   "IS_PLAY",
    //   ctx.request.body
    //   // strapi.plugins["users-permissions"].services
    // );
    if (ctx.request.body.User !== 1) {
      const User = await strapi.plugins[
        "users-permissions"
      ].services.user.fetch({
        id: ctx.request.body.User,
      });
      // console.log("USER", User);
      await strapi.plugins["users-permissions"].services.user.edit(
        {
          id: ctx.request.body.User,
        },
        { Credits: User.Credits - 5 }
      );
    }
    entity = await strapi.services["poker-game"].create(ctx.request.body);
    // await strapi.services['users-permissions.user'].update({ id }, ctx.request.body)
    return sanitizeEntity(entity, { model: strapi.models["poker-game"] });
  },
  draw: async (ctx) => {
    const HAND_COUNT = 5;
    const { id } = ctx.params;
    let game = await strapi.services["poker-game"].findOne({ id });
    if (game.Done) {
      throw strapi.errors.badRequest(`Cheater!`);
    }
    let sliceCount = 0;
    if (ctx.request.body.Holds !== undefined) {
      sliceCount = Math.abs(
        ctx.request.body.Holds.filter(Boolean).length - HAND_COUNT
      );
    }
    // console.log("DRAW", sliceCount);
    let count = 0;
    let card = "";
    const drawCards = game.Deck.slice(HAND_COUNT, sliceCount + HAND_COUNT);
    const finalCards = ctx.request.body.Holds.map((hold, index) => {
      if (hold) {
        return game.Hand[index];
      } else {
        card = drawCards[count];
        count++;
        return card;
      }
    });
    const theResult = Poker.Score(finalCards);
    console.log("DONE", finalCards, theResult, game);
    if (theResult.win !== 0) {
      await strapi.plugins["users-permissions"].services.user.edit(
        {
          id: game.User.id,
        },
        { Credits: game.User.Credits + theResult.win }
      );
    }
    let entity;
    entity = await strapi.services["poker-game"].update(
      { id },
      Object.assign(
        {
          Draw: drawCards,
          FinalCards: finalCards,
          Result: theResult,
        },
        ctx.request.body
      )
    );
    return sanitizeEntity(entity, { model: strapi.models["poker-game"] });
  },

  // new: async (ctx, next) => {
  //   console.log(ctx.request.body, "MAKIN A GAME");
  //   if (ctx.request.body.User === undefined) {
  //     ctx.request.body.User = { id: 1 };
  //   }
  //   // ctx.request.body.Deck = getNewCards();
  //   let entity;
  //   if (ctx.is("multipart")) {
  //     const { data, files } = parseMultipartData(ctx);
  //     entity = await strapi.services["poker-game"].create(data, { files });
  //   } else {
  //     entity = await strapi.services["poker-game"].create(ctx.request.body);
  //   }
  //   let payload = strapi.models["poker-game"];
  //   // console.log(payload);
  //   // payload.Hand = payload.Deck.slice(0, 5);
  //   return sanitizeEntity(entity, { model: payload });
  // },
  // draw: async (ctx) => {
  //   const { id } = ctx.params;
  //   let entity;
  //   if (ctx.is("multipart")) {
  //     const { data, files } = parseMultipartData(ctx);
  //     entity = await strapi.services["poker-game"].update({ id }, data, {
  //       draw: true,
  //       files,
  //     });
  //   } else {
  //     entity = await strapi.services["poker-game"].update(
  //       { id },
  //       ctx.request.body
  //     );
  //   }
  //   return sanitizeEntity(entity, { model: strapi.models["poker-game"] });
  // },
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
