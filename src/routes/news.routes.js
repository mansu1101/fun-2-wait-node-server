module.exports = async (fastify) => {
    const NewsController = require('../controllers/news.controller')(fastify)
    const NewsSchema = require('../schemas/news.schema')

    fastify.route({
        method: 'GET',
        url: '/',
        onRequest: [fastify.authenticate],
        schema: NewsSchema.GET,
        handler: NewsController.get
      })
 }