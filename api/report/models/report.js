"use strict"
const uuid = require("uuid")
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    beforeCreate: data => {
      let date = new Date()
      date.setDate(date.getDate() + 30)
      data.expires_at = date
      data.uuid = uuid.v4()
    },
  },
}
