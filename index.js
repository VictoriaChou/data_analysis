const restify = require('restify')
const common = require('./server/common')

const server = restify.createServer()
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())

server.get('/api/time', common.getTime)
server.get('/api/bing_daily_pic_url', common.getBingDailyPicUrl)