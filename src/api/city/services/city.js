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
      const body = { data: { ...ctx.data, publishedAt: new Date() } };
      const city = await strapi.entityService.create("api::city.city", body);

      // Set key-value pair in Redis
      redis.set(`city:${city.id}`, JSON.stringify(city));

      return city;
    },

    async update(params, data) {
      const entry = await strapi.entityService.update(
        "api::city.city",
        params,
        data
      );

      // Updete key-value pair in Redis
      const city = await strapi.db
        .query("api::city.city")
        .findOne({ where: { id: params } });
      redis.set(`city:${params}`, JSON.stringify(city));

      return entry;
    },
  };
});
