const { httpResponse } = require('./shared.schema')
const NEWS_MODEL = {
  id: {
    type: 'string'
  },
  title: {
    type: 'string'
  },
  text: {
    type: 'string'
  },
  url: {
    type: 'string'
  },
  image: {
    type: 'string'
  },
  publish_date: {
    type: 'string'
  },
  author: {
    type: 'string'
  },
  source_country: {
    type: 'string'
  },
  sentiment: {
    type: 'string'
  }
}

const GET_ALL_QUERY_PARAMS = {
  text: {
    type: 'string'
  },
  authors: {
    type: 'string'
  },
  language: {
    type: 'string'
  },
  entities: {
    type: 'string'
  },
  sort: {
    type: 'string'
  },
  'earliest-publish-date': {
    type: 'string'
  },
  'latest-publish-date': {
    type: 'string'
  },
  'news-sources': {
    type: 'string'
  },
  'location-filter': {
    type: 'string'
  },
  'sort-direction': {
    type: 'string'
  },
  'source-countries': {
    type: 'string'
  }
}

const GET_ALL_EVENTS_QUERY_PARAMS = {
  q: {
    description: 'query param like Coffee, Events in Austin, Events in Delhi etc..',
    type: 'string'
  },
}
const RESPONSE_MODEL = {
  ...NEWS_MODEL
}

const GET = {
  description: 'This is an endpoint for fetching an existing news',
  tags: ['News'],
  querystring: {
    page: { type: 'number' },
    size: { type: 'number' },
    ...GET_ALL_QUERY_PARAMS
  },
  response: httpResponse('GET', RESPONSE_MODEL)
}

const EVENTS = {
  description: 'This is an endpoint for fetching an events',
  tags: ['Events'],
  querystring: {
    page: { type: 'number' },
    size: { type: 'number' },
    ...GET_ALL_EVENTS_QUERY_PARAMS
  },
  response: httpResponse('GET', RESPONSE_MODEL)
}

module.exports = { GET, EVENTS }
