"use strict";

/**
 * state service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::state.state", ({ strapi }) => ({
  deleteMany(opts, uid) {
    const params = { ...opts };

    return strapi.entityService.deleteMany(uid, params);
  },
}));
