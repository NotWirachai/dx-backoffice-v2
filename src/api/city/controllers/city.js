"use strict";

/**
 * city controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::city.city", ({ strapi }) => ({
  async deleteMany(ctx) {
    await strapi.db.query("api::city.city").deleteMany();
  },
}));
