"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
const Poker = require("../poker");
const Strategy = require("../simple-strategy");

/**
 * A set of functions called "actions" for `poker-game`
 */

module.exports = {
  myGames: async (ctx, next) => {
    console.log("myGames", ctx.state.user.id);
    try {
      // ctx.body = 'ok';
      let entities = await strapi.services["poker-game"].find({
        User: ctx.state.user.id,
        Done: true,
      });
      return entities.map((entity) => {
        return sanitizeEntity(entity, { model: strapi.models["poker-game"] });
      });
    } catch (err) {
      ctx.body = err;
    }
  },
  myNet: async (ctx, next) => {
    console.log("myNet", ctx.state.user.id);
    try {
      // ctx.body = 'ok';
      let entities = await strapi.services["poker-game"].find({
        User: ctx.state.user.id,
        Done: true,
      });
      const spent = entities.length * 5;
      const win = entities.reduce((accumulator, entity) => {
        console.log(accumulator, entity.Result.win);
        return accumulator + parseInt(entity.Result.win);
      }, 0);
      return win - spent;
    } catch (err) {
      ctx.body = err;
    }
  },
  myUnfinished: async (ctx, next) => {
    console.log("myUnfinished", ctx.state.user.id);
    try {
      // ctx.body = 'ok';
      let entities = await strapi.services["poker-game"].find({
        User: ctx.state.user.id,
        Done: false,
      });
      return entities.map((entity) => {
        return sanitizeEntity(entity, { model: strapi.models["poker-game"] });
      });
    } catch (err) {
      ctx.body = err;
    }
  },
  myWin: async (ctx, next) => {
    console.log("myWin", ctx.state.user.id);
    try {
      // ctx.body = 'ok';
      let entities = await strapi.services["poker-game"].find({
        User: ctx.state.user.id,
        Done: true,
      });
      return entities.reduce((accumulator, entity) => {
        console.log(accumulator, entity.Result.win);
        return accumulator + parseInt(entity.Result.win);
      }, 0);
    } catch (err) {
      ctx.body = err;
    }
  },
  mySpent: async (ctx, next) => {
    console.log("mySpent", ctx.state.user.id);
    try {
      // ctx.body = 'ok';
      let entities = await strapi.services["poker-game"].find({
        User: ctx.state.user.id,
        Done: true,
      });
      return entities.length * 5;
      // .map((entity) => {
      //   return sanitizeEntity(entity, { model: strapi.models["poker-game"] });
      // });
    } catch (err) {
      ctx.body = err;
    }
  },
  myWasted: async (ctx, next) => {
    console.log("myWasted", ctx.state.user.id);
    try {
      // ctx.body = 'ok';
      let entities = await strapi.services["poker-game"].find({
        User: ctx.state.user.id,
        Done: false,
      });
      return entities.length * 5;
    } catch (err) {
      ctx.body = err;
    }
  },
  play: async (ctx) => {
    const { mode } = ctx.params;
    const validModes = ["classic", "casual", "trainer"];
    if (validModes.indexOf(mode) === -1) {
      throw strapi.errors.badRequest(
        `Pick a mode, ${JSON.stringify(validModes, null, 2)}`
      );
    }
    let entity;
    console.log(
      "IS_PLAY",
      ctx.state.user.Credits,
      ctx.request.body
      //   // strapi.plugins["users-permissions"].services
    );
    const userQuery = {
      id: ctx.state.user.id,
    };
    const User = await strapi.plugins["users-permissions"].services.user.fetch(
      userQuery
    );
    // console.log("USER", User);
    await strapi.plugins["users-permissions"].services.user.edit(userQuery, {
      Credits: User.Credits - 5,
    });
    entity = await strapi.services["poker-game"].create({
      User: userQuery,
      Mode: mode,
    });
    return sanitizeEntity(entity, { model: strapi.models["poker-game"] });
  },
  draw: async (ctx) => {
    const HAND_COUNT = 5;
    const { id } = ctx.params;
    let game = await strapi.services["poker-game"].findOne({ id });
    if (game.Done) {
      throw strapi.errors.badRequest(`Cheater!`);
    }
    const theStrategy = Strategy.simpleStrategy(game.Hand);
    let sliceCount = 0;
    if (ctx.request.body.Holds !== undefined) {
      sliceCount = Math.abs(
        ctx.request.body.Holds.filter(Boolean).length - HAND_COUNT
      );
    }
    // console.log("DRAW", sliceCount, game);
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
    // console.log("DONE", finalCards, theResult, game);
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
      {
        Draw: drawCards,
        FinalCards: finalCards,
        Result: theResult,
        Strategy: theStrategy,
        Holds: ctx.request.body.Holds,
      }
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
};
