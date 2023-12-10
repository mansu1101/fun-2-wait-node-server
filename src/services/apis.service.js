const { getJson } = require("serpapi");
const axios = require("axios");

module.exports = (fastify) => {
  const { config } = fastify;

  const searchNews = async (data) => {
    const instance = axios.create({
      baseURL: "https://api.worldnewsapi.com",
      headers: { "x-api-key": config.WORLD_NEWS_API_KEY },
    });
    const params = new URLSearchParams(data);
    const result = await instance.get(`/search-news?${params}`);
    return result?.data;
  };

  const searchVideos = async (data) => {
    const instance = axios.create({
      baseURL: "https://youtube.googleapis.com/youtube/v3",
    });

    const params = new URLSearchParams({
      ...data,
      key: config.YOUTUBE_API_KEY,
      part: "id,snippet",
      type: "video",
      maxResults: 10,
    });
    const result = await instance.get(`/search?${params}`);

    return { items: result?.data?.items, pageInfo: result?.data?.pageInfo };
  };

  const searchVideoById = async (data) => {
    const instance = axios.create({
      baseURL: "https://youtube.googleapis.com/youtube/v3",
    });

    const params = new URLSearchParams({
      ...data,
      key: config.YOUTUBE_API_KEY,
      part: "snippet,contentDetails",
      type: "video",
      maxResults: 10,
    });
    const result = await instance.get(`/videos?${params}`);
    const items = result?.data?.items.map((item) => {
      item.contentDetails.videoUrl = `https://www.youtube.com/watch?v=${data.id}`;
      return item;
    });
    return { items: items, pageInfo: result?.data?.pageInfo };
  };

  const searchWeatherHistory = async (data) => {
    const instance = axios.create({
      baseURL: "https://api.tomorrow.io/v4",
    });

    data.apikey = config.WEATHER_API_KEY;
    const params = new URLSearchParams(data);
    const result = await instance.get(`/weather/history/recent?${params}`);
    return result?.data;
  };

  return {
    getNews: async (data) => {
      try {
        const { news, available, offset, ...result } = await searchNews(data);

        return {
          docs: news,
          totalDocs: available,
          ...result,
        };
      } catch (exception) {
        throw exception;
      }
    },
    getEvents: async (data) => {
      try {
        const response = await getJson({
          engine: "google_events",
          api_key: config.GOOGLE_EVENTS_API_KEY,
          ...data,
        });
        const { events_results } = response;

        return {
          docs: events_results,
          totalDocs: events_results?.length,
          ...response,
        };
      } catch (exception) {
        throw exception;
      }
    },
    getVideos: async (data) => {
      try {
        const { items, pageInfo } = await searchVideos(data);

        return {
          docs: items,
          totalDocs: 10,
          totalPages: pageInfo?.totalResults / 10,
          ...pageInfo,
        };
      } catch (exception) {
        throw exception;
      }
    },
    getVideoById: async (data) => {
      try {
        const { items, pageInfo } = await searchVideoById(data);

        return {
          docs: items,
          totalDocs: 1,
          totalPages: 1,
          ...pageInfo,
        };
      } catch (exception) {
        throw exception;
      }
    },
    getWeatherHistory: async (data) => {
      try {
        const result = await searchWeatherHistory(data);

        return {
          docs: [result],
        };
      } catch (exception) {
        throw exception;
      }
    },
  };
};
