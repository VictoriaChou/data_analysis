const util = require('../util')
const BingDailyImage = require('../mongodb')

const getTime = (req, res, next) => {
    res.send(new Date().toDateString())
}

const getBingDailyPicUrl = (req, res, next) => {
    const content = {
        startdata: req.query.startdata,
        number: Number(req.query.number)
    }

    function cb(err, docs) {
        res.charSet('utf-8')

        if(err) res.send(err)
        res.send(docs.map((doc) => {
            return {
                url: doc.url,
                copyright: doc.copyright,
                name: doc.name
            }
        }))
    }

    const conditions = {}
    if (content.startdata) {
        conditions = { startdata: content.startdata }
    }

    BingDailyImage.find(conditions, null, { limit: content.number }, cb)
}

module.exports = {
    getTime,
    getBingDailyPicUrl
}