module.exports = ({ log, jwt }) => {
  const { UserModel } = require('../models/user.model')
  const { IOError } = require('../utils/error')
  const {
    mongooseErrorHandler,
    logError
  } = require('../utils/db.error.handler')

  return {
    login: async (data) => {
      const { userName, password } = data
      try {
        const user = await UserModel.findOne({ email: userName })
        if (!user) {
          throw new IOError(
            'Unauthorized Access, Invalid user name or password',
            {
              statusCode: 401
            }
          )
        }
        const isValidUser = await user.comparePassword(password)

        if (!isValidUser) {
          throw new IOError(
            'Unauthorized Access, Invalid user name or password',
            {
              statusCode: 401
            }
          )
        }
        return { token: await user.generateToken(jwt) }
      } catch (exception) {
        logError(
          log,
          'An unxpected error occurred while authorizing an user',
          mongooseErrorHandler(exception, {})
        )
      }
    },
    signup: async (data) => {
      try {
        return await UserModel.create(data)
      } catch (exception) {
        logError(
          log,
          'Error occurred while adding an user',
          mongooseErrorHandler(exception, {})
        )
      }
    },
    logout: async () => {
      // TODO: need to be work;
    },

    validateUser: async ({ email }) => {
      try {
        const result = await UserModel.findOne({ email }).lean()
        if (!result) {
          throw new IOError('User Not Found', { statusCode: 404 })
        }
      } catch (exception) {
        logError(
          log,
          'Error occurred while adding an user',
          mongooseErrorHandler(exception, {})
        )
      }
    }
  }
}
