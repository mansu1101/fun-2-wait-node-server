// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: true
})

const routes = require('./routes')
const config = require('./config')
const swagger = require('./plugins/swagger')
const mongodb = require('./plugins/mongodb')
const jwt = require('./plugins/jwt')
// const cors = require('./plugins/config')
const priavateAuthGuard = require('./plugins/authentication')

// Run the server!
const server = async () => {
  try {
    await fastify.register(config)
    await fastify.register(mongodb)
    await fastify.register(routes, { prefix: '/api/v1/' })
    await fastify.register(swagger)
    // await fastify.register(cors)

    const { PORT, JWT_SECRET } = fastify.config
    await fastify.register(jwt)
    await fastify.register(priavateAuthGuard)
    // fastify.log.info(`JWT SECRET found ${JWT_SECRET}`)
    await fastify.ready()
    fastify.swagger()

    await fastify.listen({
      port: PORT,
      host: 'http://34.193.81.105/',
      exclusive: false,
      readableAll: false,
      writableAll: false,
      ipv6Only: false
    })
    fastify.log.info(`JWT SECRET found ${JWT_SECRET.length}`)
    fastify.log.info(
      `server listening..... on ${fastify.server.address().port}`
    )
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

module.exports = server
