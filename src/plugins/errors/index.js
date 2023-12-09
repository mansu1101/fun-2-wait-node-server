const fastifyPlugin = require('fastify-plugin')
module.exports = fastifyPlugin(async function (fastify, opts) {
  const Fastify = require('fastify')
  fastify.setErrorHandler(function (error, request, reply) {
    // TODO: before prod needs to remove stack trace from error object. Just need to log error message.
    this.log.error(error)
    if (error instanceof Fastify.errorCodes.FST_ERR_BAD_STATUS_CODE) {
      reply.status(500).send({ ok: false })
    } else {
      reply.status(error.statusCode || 500).send({
        code: error.statusCode || 500,
        message: error.message || 'Something went wrong'
      })
    }
  })
})
