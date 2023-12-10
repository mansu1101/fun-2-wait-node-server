const {
  httpResponseHandlerWithPagination,
} = require("../utils/response.handler");

module.exports = (fastify) => {
  const ApisService = require("../services/apis.service")(fastify);

  return {
    getNews: async (request, reply) => {
      const { query } = request;
      let result;
      try {
        result = await ApisService.getNews(query);
      } catch (exception) {
        const { message, statusCode } = exception;

        return reply
          .status(statusCode || 500)
          .send(`An unxpected error occurred: ${message || exception}`);
      }
      return reply.send(httpResponseHandlerWithPagination(result));
    },

    getEvents: async (request, reply) => {
      const { query } = request;
      let result;
      try {
        result = await ApisService.getEvents(query);
      } catch (exception) {
        const { message, statusCode } = exception;

        return reply
          .status(statusCode || 500)
          .send(`An unxpected error occurred: ${message || exception}`);
      }
      return reply.send(httpResponseHandlerWithPagination(result));
    },

    getVideos: async (request, reply) => {
      const { query } = request;
      let result;
      try {
        result = await ApisService.getVideos(query);
      } catch (exception) {
        const { message, statusCode } = exception;

        return reply
          .status(statusCode || 500)
          .send(`An unxpected error occurred: ${message || exception}`);
      }
      return reply.send(httpResponseHandlerWithPagination(result));
    },

    getVideoById: async (request, reply) => {
      const { query, params } = request;
      let result;
      try {
        result = await ApisService.getVideoById({ ...query, ...params });
      } catch (exception) {
        const { message, statusCode } = exception;

        return reply
          .status(statusCode || 500)
          .send(`An unxpected error occurred: ${message || exception}`);
      }
      return reply.send(httpResponseHandlerWithPagination(result));
    },

    getWeatherHistory: async (request, reply) => {
      const { query } = request;
      let result;
      try {
        result = await ApisService.getWeatherHistory(query);
      } catch (exception) {
        const { message, statusCode } = exception;

        return reply
          .status(statusCode || 500)
          .send(`An unxpected error occurred: ${message || exception}`);
      }
      return reply.send(httpResponseHandlerWithPagination(result));
    },
  };
};
