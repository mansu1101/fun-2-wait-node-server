module.exports = ({ log }) => ({
    get: async (data) => {
      const { page, size } = data
      const { limit, offset } = getPagination(page, size)
      try {
        return ( {newsId:"1",A:hello} )
      } catch (exception) {
        logError(
          log,
          'Error occurred while getting news',
          mongooseErrorHandler(exception, {})
        )
      }
    }

})