const fastifyPlugin = require('fastify-plugin')
const path = require('path')
module.exports = fastifyPlugin(async (fastify, opts) => {
  await fastify.register(require('@fastify/view'), {
    engine: {
      ejs: require('ejs')
    },
    root: path.join(__dirname, '../../templates')
  })
  fastify.view.clearCache()
})
