const redis = require('redis')
let redisClient;
(async() => {
  redisClient = redis.createClient()
  redisClient.on('error', (error) => console.log('redis error' + error))
  await redisClient.connect()
})()
module.exports = redisClient;