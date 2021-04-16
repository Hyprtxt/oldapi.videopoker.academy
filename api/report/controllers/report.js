"use strict"

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const { parseMultipartData, sanitizeEntity } = require("strapi-utils")

module.exports = {
  /**
   * Retrieve a record.
   *
   * @return {Object}
   */
  async findOneByUUID(ctx) {
    const { uuid } = ctx.params

    const entity = await strapi.services.report.findOne({ uuid })
    return sanitizeEntity(entity, { model: strapi.models.report })
  },

  /**
   * Update a record.
   *
   * @return {Object}
   */
  async updateByUUID(ctx) {
    const { uuid } = ctx.params

    let entity
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx)
      entity = await strapi.services.report.update({ uuid }, data, {
        files,
      })
    } else {
      entity = await strapi.services.report.update({ uuid }, ctx.request.body)
    }
    return sanitizeEntity(entity, { model: strapi.models.report })
  },
}
