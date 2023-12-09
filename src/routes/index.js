module.exports = async (fastify) => {
  const health = require('./health.routes')
 // const users = require('./user.routes')
  const auth = require('./auth.routes')
  // const userRoles = require('./user.role.routes')
  const apiRoutes = require('./apis.routes')

  fastify.register(health, { prefix: '/live' })
  fastify.register(auth, { prefix: '/' })
  // fastify.register(users, { prefix: '/auth/users' })
  // fastify.register(userRoles, { prefix: '/auth/userRoles' })
  fastify.register(apiRoutes, { prefix: '/apis' })
}
