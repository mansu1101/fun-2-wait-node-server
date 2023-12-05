const { httpResponse } = require('./shared.schema')

const NEWS = {
    newsName: {
      type: 'string'
    },
    newsHeadline: {
      type: 'string'
    },
    city: {
      type: 'string'
    },
    state: {
      type: 'string'
    },
    zipCode: {
      type: 'string'
    },
    country: {
      type: 'string'
    }
  }

  const RESPONSE_MODEL = {
    newsId: {
      type: 'string'
    }
  }

  const GET = {
    description: 'This is an endpoint for fetching an existing news',
    tags: ['News'],
    querystring: {
      page: { type: 'number' },
      size: { type: 'number' },
      ...NEWS
    },
    response: httpResponse('GET', RESPONSE_MODEL)
  }

  module.exports = { GET }
  