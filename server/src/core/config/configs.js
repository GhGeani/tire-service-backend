module.exports = {
  server: {
    port: process.env.PORT || 3000
  },

  cloud: {
    CLOUD_NAME: 'demsdreams',
    API_KEY: '117631267167635',
    API_SECRET: 'c3b7QHsGzMpelRX3vd48-AF8Fxw',
    CLOUD_FOLDER: 'tireshopdev'
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