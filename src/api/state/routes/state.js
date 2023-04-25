"use strict";

/**
 * state router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;
const defaultRouter = createCoreRouter("api::state.state");

const customRouter = (innerRouter, extraRoutes = []) => {
  let routes;
  return {
    get prefix() {
      return innerRouter.prefix;
    },
    get routes() {
      if (!routes) routes = innerRouter.routes.concat(extraRoutes);
      return routes;
    },
  };
};

const myExtraRoutes = [
  {
    method: "DELETE",
    path: "/states",
    handler: "api::state.state.deleteMany",
  },
];

module.exports = customRouter(defaultRouter, myExtraRoutes);
