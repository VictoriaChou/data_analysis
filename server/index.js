const restify = require('restify')
const common = require('./common')

const server = restify.createServer()
server.use(restify.queryParser())
server.use(restify.bodyParser())
server.use(restify.CORS())

server.get('/api/time', common.getTime)
server.get('/api/bing_daily_pic_url', common.getBingDailyPicUrl)