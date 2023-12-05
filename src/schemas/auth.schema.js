const { httpResponse } = require('./shared.schema')

const LOGIN = {
  description: 'Login using username and password',
  tags: ['Auth'],
  required: ['userName', 'password'],
  body: {
    description: 'Payload for login',
    type: 'object',
    properties: {
      userName: {
        type: 'string',
        default: 'super_admin@server.com'
      },
      password: {
        type: 'string',
        default: '8L3x!C*^W%wHgSa#'
      }
    }
  },
  response: httpResponse('POST', {
    token: {
      type: 'string'
    }
  })
}

const SIGN_UP = {
  description: 'register using email and password',
  tags: ['Auth'],
  required: ['email', 'password', 'firstName', 'lastName'],
  body: {
    description: 'Payload for register a new user',
    type: 'object',
    properties: {
      firstName: {
        type: 'string'
      },
      email: {
        type: 'string'
      },
      lastName: {
        type: 'string'
      },
      password: {
        type: 'string'
      }
    },
    additionalProperties: false
  },
  response: httpResponse('POST', {
    message: {
      type: 'string'
    }
  })
}

const LOGOUT = {
  description: 'Logout of an user',
  tags: ['Auth'],
  headers: {
    type: 'object',
    description: 'Payload for user token',
    properties: {
      token: {
        type: 'string'
      }
    }
  },
  response: httpResponse('GET_BY_ID', {
    message: {
      type: 'string'
    }
  })
}

const VALIDATE_USER = {
  description: 'Api to validate email of an user',
  tags: ['Auth'],
  required: ['email'],
  params: {
    description: 'Payload for validate email of an user',
    type: 'object',
    properties: {
      email: {
        type: 'string'
      }
    }
  },
  response: httpResponse('GET_BY_ID', {
    message: {
      type: 'string'
    },
    userId: {
      type: 'string'
    }
  })
}
module.exports = { LOGIN, SIGN_UP, LOGOUT, VALIDATE_USER }
