"use strict";

/**
 * city service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::city.city", ({ strapi }) => {
  const redis = strapi.redis.connections.default.client;
  return {
    async deleteMany() {
      redis.flushdb((err, response) => {
        if (err) throw err;
        console.log(response); // แสดงจำนวน key ที่ถูกลบ
      });
      // return await strapi.entityService.deleteMany("api::city.city");
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

    async delete(params) {
      const entry = await strapi.entityService.delete("api::city.city", params);

      // ลบ key ออกจาก Redis database
      redis.del(`city:${params}`, (err, response) => {
        if (err) throw err;
        console.log(response); // แสดงจำนวน key ที่ถูกลบ
      });

      return entry;
    },
  };
});
