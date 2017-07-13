const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.set('debug', true)

const DB_ADDRESS = 'mongodb://localhost/bingpic'
mongoose.connect(DB_ADDRESS)

const db = mongoose.connection
db.on('error', (err) => console.error(`mongodb connection err: ${err}`))
db.once('open', () => console.log(`mongodb connection ok @${new Date()}`))

const bingPicSchema = mongoose.Schema({
    url: String,
    urlbase: String,
    name: String,
    copyright: String,
    market: String,
    startdate: String,
    fullstartdate: String
})

export const BingPic = mongoose.model('BingPic', bingPicSchema) 
