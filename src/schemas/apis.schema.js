const { httpResponse } = require("./shared.schema");

const EVENT_MODEL = {
  title: {
    type: "string",
  },
  address: {
    type: "array",
  },
  link: {
    type: "string",
  },
  description: {
    type: "string",
  },
  thumbnail: {
    type: "string",
  },
  image: {
    type: "string",
  },
  date: {
    type: "object",
    properties: {
      start_date: {
        type: "string",
      },
      when: {
        type: "string",
      },
    },
  },
  event_location_map: {
    type: "object",
    properties: {
      image: {
        type: "string",
      },
      link: {
        type: "string",
      },
      serpapi_link: {
        type: "string",
      },
    },
  },
  ticket_info: {
    type: "array",
    items: {
      type: "object",
      properties: {
        source: {
          type: "string",
        },
        link: {
          type: "string",
        },
        link_type: {
          type: "string",
        },
      },
    },
  },
  venue: {
    type: "object",
    properties: {
      name: {
        type: "string",
      },
      reviews: {
        type: "string",
      },
      link: {
        type: "string",
      },
    },
  },
};

const NEWS_MODEL = {
  id: {
    type: "string",
  },
  title: {
    type: "string",
  },
  text: {
    type: "string",
  },
  url: {
    type: "string",
  },
  image: {
    type: "string",
  },
  publish_date: {
    type: "string",
  },
  author: {
    type: "string",
  },
  source_country: {
    type: "string",
  },
  sentiment: {
    type: "string",
  },
};

const VIDEOS_MODEL = {
  etag: {
    type: "string",
  },
  kind: {
    type: "string",
  },
  id: {
    type: "object",
    properties: {
      kind: {
        type: "string",
      },
      videoId: {
        type: "string",
      },
    },
  },
  snippet: {
    type: "object",
    properties: {
      publishedAt: {
        type: "string",
      },
      publishTime: {
        type: "string",
      },
      channelId: {
        type: "string",
      },
      title: {
        type: "string",
      },
      description: {
        type: "string",
      },
      channelTitle: {
        type: "string",
      },
      liveBroadcastContent: {
        type: "string",
      },
      defaultAudioLanguage: {
        type: "string",
      },
      categoryId: {
        type: "string",
      },
      tags: {
        type: "array",
      },
      localized: {
        type: "object",
        properties: {
          title: {
            type: "string",
          },
          description: {
            type: "string",
          },
        },
      },
      thumbnails: {
        type: "object",
        properties: {
          default: {
            type: "object",
            properties: {
              url: {
                type: "string",
              },
              width: {
                type: "string",
              },
              height: {
                type: "string",
              },
            },
          },
          medium: {
            type: "object",
            properties: {
              url: {
                type: "string",
              },
              width: {
                type: "string",
              },
              height: {
                type: "string",
              },
            },
          },
          high: {
            type: "object",
            properties: {
              url: {
                type: "string",
              },
              width: {
                type: "string",
              },
              height: {
                type: "string",
              },
            },
          },
          maxres: {
            type: "object",
            properties: {
              url: {
                type: "string",
              },
              width: {
                type: "string",
              },
              height: {
                type: "string",
              },
            },
          },
          standard: {
            type: "object",
            properties: {
              url: {
                type: "string",
              },
              width: {
                type: "string",
              },
              height: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
  contentDetails: {
    type: "object",
    properties: {
      duration: {
        type: "string",
      },
      dimension: {
        type: "string",
      },
      definition: {
        type: "string",
      },
      caption: {
        type: "boolean",
      },
      licensedContent: {
        type: "boolean",
      },
      projection: {
        type: "string",
      },
      contentRating: {
        type: "object",
      },
      videoUrl: {
        type: "string",
      },
    },
  },
};

const WEATHER_HISTORY_MODEL = {
  location: {
    type: "object",
    properties: {
      lat: {
        type: "number",
      },
      lon: {
        type: "number",
      },
      name: {
        type: "string",
      },
      type: {
        type: "string",
      },
    },
  },
  timelines: {
    hourly: {
      type: "array",
      items: {
        type: "object",
        properties: {
          time: {
            type: "string",
          },
          values: {
            type: "object",
            properties: {
              cloudBase: {
                type: "string",
              },
              cloudCeiling: {
                type: "string",
              },
              cloudCover: {
                type: "number",
              },
              dewPoint: {
                type: "number",
              },
              evapotranspiration: {
                type: "number",
              },
              freezingRainIntensity: {
                type: "number",
              },
              humidity: {
                type: "number",
              },
              iceAccumulation: {
                type: "number",
              },
              iceAccumulationLwe: {
                type: "number",
              },
              precipitationProbability: {
                type: "number",
              },
              pressureSurfaceLevel: {
                type: "number",
              },
              rainAccumulation: {
                type: "number",
              },
              rainAccumulationLwe: {
                type: "number",
              },
              rainIntensity: {
                type: "number",
              },
              sleetAccumulation: {
                type: "number",
              },
              sleetAccumulationLwe: {
                type: "number",
              },
              sleetIntensity: {
                type: "number",
              },
              snowAccumulation: {
                type: "number",
              },
              snowAccumulationLwe: {
                type: "number",
              },
              snowIntensity: {
                type: "number",
              },
              temperature: {
                type: "number",
              },
              temperatureApparent: {
                type: "number",
              },
              uvHealthConcern: {
                type: "number",
              },
              uvIndex: {
                type: "number",
              },
              visibility: {
                type: "number",
              },
              weatherCode: {
                type: "number",
              },
              windDirection: {
                type: "number",
              },
              windGust: {
                type: "number",
              },
              windSpeed: {
                type: "number",
              },
            },
          },
        },
      },
    },
    daily: {
      type: "array",
      items: {
        type: "object",
        properties: {
          time: {
            type: "string",
          },
          values: {
            type: "object",
            properties: {
              cloudBase: {
                type: "string",
              },
              cloudCeiling: {
                type: "string",
              },
              cloudCover: {
                type: "number",
              },
              dewPoint: {
                type: "number",
              },
              evapotranspiration: {
                type: "number",
              },
              freezingRainIntensity: {
                type: "number",
              },
              humidity: {
                type: "number",
              },
              iceAccumulation: {
                type: "number",
              },
              iceAccumulationLwe: {
                type: "number",
              },
              precipitationProbability: {
                type: "number",
              },
              pressureSurfaceLevel: {
                type: "number",
              },
              rainAccumulation: {
                type: "number",
              },
              rainAccumulationLwe: {
                type: "number",
              },
              rainIntensity: {
                type: "number",
              },
              sleetAccumulation: {
                type: "number",
              },
              sleetAccumulationLwe: {
                type: "number",
              },
              sleetIntensity: {
                type: "number",
              },
              snowAccumulation: {
                type: "number",
              },
              snowAccumulationLwe: {
                type: "number",
              },
              snowIntensity: {
                type: "number",
              },
              temperature: {
                type: "number",
              },
              temperatureApparent: {
                type: "number",
              },
              uvHealthConcern: {
                type: "number",
              },
              uvIndex: {
                type: "number",
              },
              visibility: {
                type: "number",
              },
              weatherCode: {
                type: "number",
              },
              windDirection: {
                type: "number",
              },
              windGust: {
                type: "number",
              },
              windSpeed: {
                type: "number",
              },
            },
          },
        },
      },
    },
  },
};

const GET_NEWS_QUERY_PARAMS = {
  text: {
    type: "string",
  },
  authors: {
    type: "string",
  },
  language: {
    type: "string",
  },
  entities: {
    type: "string",
  },
  sort: {
    type: "string",
  },
  "earliest-publish-date": {
    type: "string",
  },
  "latest-publish-date": {
    type: "string",
  },
  "news-sources": {
    type: "string",
  },
  "location-filter": {
    type: "string",
  },
  "sort-direction": {
    type: "string",
  },
  "source-countries": {
    type: "string",
  },
};

const GET_EVENTS_QUERY_PARAMS = {
  q: {
    description:
      "query param like Coffee, Events in Austin, Events in Delhi etc..",
    type: "string",
  },
  location_requested: {
    description:
      "Parameter defines from where you want the search to originate. If several locations match the location requested, we'll pick the most popular one. Head to the /locations.json API if you need more precise control.",
    type: "string",
  },
  gl: {
    description:
      "Parameter defines the country to use for the Google Events search. It's a two-letter country code. (e.g., us for the United States, uk for United Kingdom, or fr for France)",
    type: "string",
  },
  hl: {
    description:
      "Parameter defines the language to use for the Google Events search. It's a two-letter language code. (e.g., en for English, es for Spanish, or fr for French)",
    type: "string",
  },
  htichips: {
    description: `Parameter allows the use of different filters.

    date:today - Today's Events
    date:tomorrow - Tomorrow's Events
    date:week - This Week's Events
    date:today - Today's Weekend's Events
    date:next_week - Next Week's Events
    date:month - This Month's Events
    date:next_month - Next Month's Events
    event_type:Virtual-Event - Online Events
    
    You can also mix different kinds of filters by separating them with a comma.
    event_type:Virtual-Event,date:today Today's Online Events`,

    type: "string",
    enum: [
      "date:today",
      "date:tomorrow",
      "date:week",
      "date:next_week",
      "date:month",
      "date:next_month",
      "event_type:Virtual-Event",
    ],
  },
};

const GET_VIDEO_BY_ID_QUERY_PARAMS = {
  id: {
    type: "string",
    description: "fetch video ids by text",
  },
};

const GET_VIDEOS_QUERY_PARAMS = {
  q: {
    type: "string",
    description: "fetch video ids by text",
  },
};

const GET_WEATHER_HISTORY_QUERY_PARAMS = {
  location: {
    description: `Using the recent history weather API you can access historical weather forecasts for your location, including hourly history for the last 24 hours, and daily history for the last day.
    For the location query parameter, we support multiple location types:
    
    Latitude and Longitude (Decimal degree) location=42.3478, -71.0466
    City name location=new york
    US zip location=10001 US(2-letter code based on ISO-3166)
    UK postcode location=SW1`,
    type: "string",
  },
};

const GET_NEWS = {
  description: "This is an endpoint for fetching an existing news",
  tags: ["Apis"],
  querystring: {
    ...GET_NEWS_QUERY_PARAMS,
  },
  response: httpResponse("GET", NEWS_MODEL),
};

const GET_EVENTS = {
  description: "This is an endpoint for fetching an events",
  tags: ["Apis"],
  required: ["q"],
  querystring: {
    ...GET_EVENTS_QUERY_PARAMS,
  },
  response: httpResponse("GET", EVENT_MODEL),
};

const GET_VIDEO_BY_ID = {
  description: "This is an endpoint for fetching an existing videos",
  tags: ["Apis"],
  querystring: {
    ...GET_VIDEO_BY_ID_QUERY_PARAMS,
  },
  response: httpResponse("GET", VIDEOS_MODEL),
};

const GET_VIDEOS = {
  description: "This is an endpoint for fetching an existing videos",
  tags: ["Apis"],
  querystring: {
    ...GET_VIDEOS_QUERY_PARAMS,
  },
  response: httpResponse("GET", VIDEOS_MODEL),
};

const GET_WEATHER_HISTORY = {
  description: "This is an endpoint for fetching an weather history",
  tags: ["Apis"],
  required: ["location"],
  querystring: {
    ...GET_WEATHER_HISTORY_QUERY_PARAMS,
  },
  response: httpResponse("GET", WEATHER_HISTORY_MODEL),
};

module.exports = {
  GET_NEWS,
  GET_EVENTS,
  GET_VIDEOS,
  GET_VIDEO_BY_ID,
  GET_WEATHER_HISTORY,
};
