module.exports = {
  server: {
    port: process.env.PORT || 3000
  },

  database: {
    dbname: 'body_shop',
    collections: {
      item: 'item',
      info: 'info',
      announce: 'announce',
      user: 'user',
      slide: 'slide'
    }
  },
  secret: {
    key: 'I07love6229to571code3RR'
  }
}