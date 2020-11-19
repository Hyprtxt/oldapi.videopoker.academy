'use strict';
const { sanitizeEntity } = require('strapi-utils');
/**
 * A set of functions called "actions" for `poker-game`
 */

module.exports = {
  // find: async (ctx) => {
  //   let entities;
  //   console.log(ctx.state.user)
  //   if (ctx.query._q) {
  //     entities = await strapi.services['poker-game'].search(ctx.query);
  //   } else {
  //     entities = await strapi.services['poker-game'].find(ctx.query);
  //   }
  //   // console.log(entities)
  //   return entities.map(entity => {
  //     console.log( entity )
  //     // if ( entity.created_by.id === ctx.state.user.id ) {
  //       return sanitizeEntity(entity, { model: strapi.models['poker-game'] })
  //     // }
  //   });
  // },
  myGames: async (ctx, next) => {
    console.log( 'myGames', ctx, ctx.state );
    try {
      // ctx.body = 'ok';
      let entities = await strapi.services['poker-game'].find(ctx.query);
      return entities.map(entity => {
        // console.log( entity )
        if ( entity.User.id === ctx.state.user.id ) {
          return sanitizeEntity(entity, { model: strapi.models['poker-game'] })
        }
      });
    } catch (err) {
      ctx.body = err;
    }
  }
};
