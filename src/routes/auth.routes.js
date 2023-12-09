module.exports = async (fastify) => {
  const AuthController = require('../controllers/auth.controller')(fastify)
  const AuthSchema = require('../schemas/auth.schema')
  fastify.route({
    method: 'POST',
    url: '/login',
    schema: AuthSchema.LOGIN,
    handler: AuthController.login
  })
  fastify.route({
    method: 'POST',
    url: '/signup',
    schema: AuthSchema.SIGN_UP,
    handler: AuthController.signup
  })
  // fastify.route({
  //   method: "GET",
  //   url: "/logout",
  //   schema: AuthSchema.LOGOUT,
  //   handler: AuthController.logout,
  // });

  fastify.route({
    method: 'GET',
    url: '/validate/:email',
    schema: AuthSchema.VALIDATE_USER,
    handler: AuthController.validateUser
  })
}
