module.exports = async (fastify) => {
  const ApisController = require('../controllers/apis.controller')(fastify)
  const ApisSchema = require('../schemas/apis.schema')
  
  fastify.route({
    method: 'GET',
    url: '/news',
    onRequest: [fastify.authenticate],
    schema: ApisSchema.GET_NEWS,
    handler: ApisController.getNews
  })

  fastify.route({
    method: 'GET',
    url: '/events',
    onRequest: [fastify.authenticate],
    schema: ApisSchema.GET_EVENTS,
    handler: ApisController.getEvents
  })


  fastify.route({
    method: 'GET',
    url: '/videos',
    onRequest: [fastify.authenticate],
    schema: ApisSchema.GET_VIDEOS,
    handler: ApisController.getVideos
  })


  fastify.route({
    method: 'GET',
    url: '/weather',
    onRequest: [fastify.authenticate],
    schema: ApisSchema.GET_WEATHER_HISTORY,
    handler: ApisController.getWeatherHistory
  })
}
