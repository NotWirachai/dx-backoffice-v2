module.exports = {
  // Step 1: Configure the redis connection
  // @see https://github.com/strapi-community/strapi-plugin-redis
  redis: {
    config: {
      connections: {
        default: {
          connection: {
            host: "messageproxy.redis.cache.windows.net",
            port: 6379,
            password: "aQlltP5EZ1TlFzOJjfPV2hdKtc0Ku7t36AzCaP4OMf0=",
            db: 0,
          },
          settings: {
            debug: false,
          },
        },
      },
    },
  },
  // Step 2: Configure the redis cache plugin
  "rest-cache": {
    config: {
      provider: {
        name: "redis",
        options: {
          max: 32767,
          connection: "default",
        },
      },
      strategy: {
        enableEtagSupport: true,
        logs: true,
        clearRelatedCache: true,
        maxAge: 3600000,
        contentTypes: [
          // list of Content-Types UID to cache
          "api::city.city",
          {
            contentType: "api::city.city",
            maxAge: 3600000,
            hitpass: false,
            keys: {
              useQueryParams: false,
              useHeaders: ["accept-encoding"],
            },
            maxAge: 18000,
            method: "GET",
          },
        ],
      },
    },
  },
};
