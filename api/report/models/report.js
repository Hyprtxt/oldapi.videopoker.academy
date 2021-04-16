"use strict"
const uuid = require("uuid")
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000

module.exports = {
  lifecycles: {
    beforeCreate: data => {
      data.expires = new Date().getTime() + SEVEN_DAYS_MS
      data.uuid = uuid.v4()
    },
  },
}
