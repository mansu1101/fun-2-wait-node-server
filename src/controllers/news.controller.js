const {
  httpResponseHandlerWithPagination
} = require('../utils/response.handler')

module.exports = (fastify) => {
  const NewsService = require('../services/news.service')(fastify)

  return {
    get: async (request, reply) => {
      const { query } = request
      let result
      try {
        result = await NewsService.get(query)
      } catch (exception) {
        const { message, statusCode } = exception

        return reply
          .status(statusCode || 500 )
          .send(`An unxpected error occurred: ${message || exception}`)
      }
      return reply.send(httpResponseHandlerWithPagination(result))
    },

    getEvents: async (request, reply) => {
      const { query } = request
      let result
      try {
        result = await NewsService.getEvents(query)
      } catch (exception) {
        const { message, statusCode } = exception

        return reply
          .status(statusCode || 500 )
          .send(`An unxpected error occurred: ${message || exception }`)
      }
      return reply.send(httpResponseHandlerWithPagination(result))
    }
  }
}
