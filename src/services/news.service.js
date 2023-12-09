const { mongooseErrorHandler, logError } = require('../utils/db.error.handler')
const { getJson } = require("serpapi");

const axios = require('axios')

module.exports = (fastify) => {
  const { config } = fastify
  const instance = axios.create({
    baseURL: 'https://api.worldnewsapi.com',
    headers: { 'x-api-key': config.WORLD_NEWS_API_KEY }
  })
  const Search = async (data) => {
    const params = new URLSearchParams(data)
    const result = await instance.get(`/search-news?${params}`)
    return result?.data
  }
  return {
    get: async (data) => {
      try {
        const { news, available, offset, ...result } = await Search(data)

        return {
          docs: news,
          totalDocs: available,
          ...result
        }
      } catch (exception) {
        logError(
          {},
          'Error occurred while getting news',
          mongooseErrorHandler(exception, {})
        )
      }
    },
    getEvents: async (data) => {
      try {
        console.log('get events api call  ',data)
        // const { news, available, offset, ...result } = await Search(data)
         const response = await getJson({
           engine: "google",
           api_key: config.GOOGLE_EVENTS_API_KEY,
           q: "coffee",
           location: "Austin, Texas",
         });
         console.log('response :::::', response);
         const {recipes_results } = response;
       
         return {
           docs: recipes_results,
           totalDocs: 4,
           ...response
         }
      } catch (exception) {
        logError(
          {},
          'Error occurred while getting news',
          mongooseErrorHandler(exception, {})
        )
      }
    }
  }
}
