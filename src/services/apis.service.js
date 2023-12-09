const { getJson } = require("serpapi");
const axios = require('axios')

module.exports = (fastify) => {
  const { config } = fastify
 
  const searchNews = async (data) => {
    const instance = axios.create({
      baseURL: 'https://api.worldnewsapi.com',
      headers: { 'x-api-key': config.WORLD_NEWS_API_KEY }
    })
    const params = new URLSearchParams(data)
    const result = await instance.get(`/search-news?${params}`)
    return result?.data
  }

  const searchVideos = async (data) => {
    const instance = axios.create({
      baseURL: 'https://youtube.googleapis.com/youtube/v3/videos',
     // headers: { 'x-api-key': config.WORLD_NEWS_API_KEY }
    })

    data.key = config.YOUTUBE_API_KEY
    const params = new URLSearchParams(data)
    const result = await instance.get(`/search-news?${params}`)
    return result?.data
  }

  const searchWeatherHistory = async (data) => {
    const instance = axios.create({
      baseURL: 'https://api.tomorrow.io/v4/weather/history/recent',
     // headers: { 'x-api-key': config.WORLD_NEWS_API_KEY }
    })

    data.apikey = config.WEATHER_API_KEY
    const params = new URLSearchParams(data)
    const result = await instance.get(`/search-news?${params}`)
    return result?.data
  }


  return {
    getNews: async (data) => {
      try {
        const { news, available, offset, ...result } = await searchNews(data)

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
    },
    getVideos: async (data) => {
      try {
        const { news, available, offset, ...result } = await searchVideos(data)

        return {
          docs: news,
          totalDocs: available,
          ...result
        }
      } catch (exception) {
        throw exception
      }
    },
    getWeatherHistory: async (data) => {
      try {
        const { news, available, offset, ...result } = await searchWeatherHistory(data)

        return {
          docs: news,
          totalDocs: available,
          ...result
        }
      } catch (exception) {
        throw exception
      }
    },
  }
}
