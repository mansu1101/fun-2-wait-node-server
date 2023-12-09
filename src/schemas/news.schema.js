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

const GET_ALL_QUERY_PARAMS = {
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

const RESPONSE_MODEL = {
  ...NEWS_MODEL,
};

const EVENT_RESPONSE_MODEL = {
  ...EVENT_MODEL,
};

const GET = {
  description: "This is an endpoint for fetching an existing news",
  tags: ["News"],
  querystring: {
    page: { type: "number" },
    size: { type: "number" },
    ...GET_ALL_QUERY_PARAMS,
  },
  response: httpResponse("GET", RESPONSE_MODEL),
};

const EVENTS = {
  description: "This is an endpoint for fetching an events",
  tags: ["News"],
  required: ["q"],
  querystring: {
    ...GET_EVENTS_QUERY_PARAMS,
  },
  response: httpResponse("GET", EVENT_RESPONSE_MODEL),
};

module.exports = { GET, EVENTS };
