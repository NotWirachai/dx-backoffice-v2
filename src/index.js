"use strict";

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    strapi.db.lifecycles.subscribe({
      models: ["plugin::users-permissions.user"],

      async afterCreate(event) {
        const { result, params } = event;
        await strapi.entityService.create("api::city.city", {
          data: {
            X: Math.floor(Math.random() * 1201),
            Y: Math.floor(Math.random() * 1201),
            user: result.id,
            publishedAt: new Date(),
          },
        });
      },
    });
  },
};
