module.exports = {
  isEmptyObject: (data) => {
    for (const key in data) {
      if (data?.[key]) {
        return false
      }
    }
    return true
  },
  flatProperties: (model) => {
    const traverse = (source, props, dest) => {
      for (const key in source) {
        if (source[key].type === 'object') {
          const query = {}
          traverse(source[key].properties, query, props)
          dest[key] = { ...query }
        } else if (source[key].type === 'array') {
          const query = {}
          traverse(source[key].items.properties, query, props)
          dest[key] = { ...query }
        } else {
          props[key] = ''
          dest[key] = ''
        }
      }
    }
    const properties = {}
    traverse(model, {}, properties)
    return properties
  },
  generateRandomPassword: (userId) => {
    const chars =
      '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
      new Date().getTime() // for unique
    const charsLength = chars.length
    const passwordLength = 12
    let password = ''
    for (let i = 0; i <= passwordLength; i++) {
      const randomNumber = Math.floor(Math.random() * charsLength)
      password += chars.substring(randomNumber, randomNumber + 1)
    }
    return password
  }
}
