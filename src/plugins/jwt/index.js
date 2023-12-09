const fastifyPlugin = require('fastify-plugin')
const jwt = require('@fastify/jwt')
module.exports = fastifyPlugin(async function (fastify, opts) {
  fastify.register(jwt, {
    secret: '638afdc97ca894301397237b'
  })
})
