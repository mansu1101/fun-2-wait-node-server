const { isEmptyObject } = require('./utils')
const flatten = require('flat')

const buildPatchQuery = (data, model = {}) => {
  const buildQueryWithValidation = (data, model) => {
    const query = {}
    const flattenModel = flatten(model)
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(flattenModel, key)) {
        // key validation
        query[key] = data[key]
      }
    }
    return query
  }

  const buildQuery = (data) => {
    const query = {}
    for (const key in data) {
      query[key] = data[key]
    }
    return query
  }

  const query = isEmptyObject(model)
    ? buildQuery(data)
    : buildQueryWithValidation(data, model)

  // if (Object.keys(query).length > 5) {
  //   throw new IOError("Please use post/put method instead of patch", {
  //     statusCode: 400,
  //   });
  // }
  return { $set: query }
}

const getPagination = (page, size) => {
  // TODO: need to get per page limit from app-configs;
  const PER_PAGE_LIMIT = 20
  const limit = size ? +size : PER_PAGE_LIMIT
  const offset = page ? page * limit : 0
  return { limit, offset }
}

const buildGetDataQuery = (data) => {
  const { page, size, ...rest } = data
  // return type with respective db operators;
  const query = {}
  for (let key in rest) {
    let value = rest[key]
    switch (typeof value) {
      case 'object':
        if (Array.isArray(value)) {
          // TODO: "Need to improve the logic"
          value = { $in: Array.from(new Set(value[0]?.split(','))) }
        } else {
          key = flatten(key)
        }
        break
      default:
        break
    }
    query[key] = value
  }

  return query
}

module.exports = {
  buildPatchQuery,
  getPagination,
  buildGetDataQuery
}
