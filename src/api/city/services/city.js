"use strict";

/**
 * city service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::city.city", ({ strapi }) => {
  const redis = strapi.redis.connections.default.client;
  return {
    deleteMany(opts, uid) {
      const params = { ...opts };

      return strapi.entityService.deleteMany(uid, params);
    },

    create: async (ctx) => {
      const city = await strapi.entityService.create("api::city.city", ctx);

      // Set key-value pair in Redis
      redis.set(`city:${city.id}`, JSON.stringify(city));

      return city;
    },
  };
});
