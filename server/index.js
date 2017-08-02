const restify = require('restify')
const common = require('./common')

const server = restify.createServer()

server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())

server.get('/api/time', common.getTime)
server.get('/api/bing_daily_pic_url', common.getBingDailyPicUrl)

server.listen(8080, () => {
    console.log('%s listening at %s', server.name, server.url)
})