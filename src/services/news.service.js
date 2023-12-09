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
        throw exception
      }
    },
    getEvents: async (data) => {
      try {
         const response = await getJson({
           engine: "google_events",
           api_key: config.GOOGLE_EVENTS_API_KEY,
           ...data,
         });
         const {events_results } = response;
       
         return {
           docs: events_results,
           totalDocs: events_results?.length,
           ...response
         }
      } catch (exception) {
        throw exception
      }
    }
  }
}
