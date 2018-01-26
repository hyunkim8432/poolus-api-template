module.exports = {
  mode: 'production',
  server: {
    host: '127.0.0.1',
    port: 2224,
  },
  timezone: 'Asia/Seoul',
  database: {
    mariadb: {
      slave: {
      },
      master: {
      },
      sms: {
      }
    },
    postgres: {
      host: {
      }
    }
  },
  redis: {
  },
  elasticsearch: {
  },
  amqp: {
  },
  image: {

  }
};