"use strict";

/**
 * state controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::state.state", ({ strapi }) => ({
  async deleteMany(ctx) {
    await strapi.db.query("api::state.state").deleteMany();
  },
}));
