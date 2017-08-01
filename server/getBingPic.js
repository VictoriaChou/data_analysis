const http = require('http')
const mongoose = require('./mongodb')
const BingDailyPic = mongoose.BingDailyPic
const assert = require('assert')

const PICNUM = 8
const HOST = 'http://cn.bing.com'
const BING_QUERY_API = '/HPImageArchive.aspx?'
const BING_QUERY_PARAMS = `format=js&idx=0&n=${PICNUM}`

const cb = (resolve, url) => {
    let dailyImages = []
    http.get(url, (res) => {
        const statusCode = res.statusCode
        const contentType = res.headers['content-type']
    
        let error
        if (statusCode !== 200) {
            error = new Error('Requset Failed.\n' +
                `Status Code: ${statusCode}`)
        } else if (!/^application\/json/.test(contentType)) { //判断是不是JSON
            error = new Error('Invalid content-type.\n' +
                `Expected application/json but received ${contentType}`)
        }
        if (error) {
            console.log(error.message)
            // consume response data to free up memory
            res.resume()
            return
        }
        let rawData = ''
        res.on('data', (chunk) => {
            rawData += chunk
        })
        
        res.on('end', () => {
            try {
                const parsedData = JSON.parse(rawData)
                if(parsedData.images instanceof Array) {
                    parsedData.images.forEach((item, index) => {
                        dailyImages.push(
                            new BingDailyPic({
                                url: `${HOST}${item.url}`,
                                urlbase: `${HOST}${item.baseurl}`,
                                name: item.urlbase.match(/\w+(?=_)/g)[0],
                                copyright: item.copyright,
                                startdate: item.startdate,
                                fullstartdate: item.fullstartdate
                            })
                        )
                    })
                    resolve(dailyImages)
                }
            } catch (e) {
                console.log(e.message)
            }
        })
    })
}

const saveImgs =  (images) => {
    for (let i = 0; i < images.length; i++) {
        const query = BingDailyPic.find({ name: images[i].name })
        assert.equal(query.exec().constructor, global.Promise)
        query.then((docs) =>{
            if (docs.length === 0) {
                console.log('aaaa')
                images[i].save()
            }
        })
    }
}
const getImgs = function(url) {
    const p = new Promise((resolve, reject) => {
        cb(resolve,url)
    }).then((data) => {
        saveImgs(data)
    })
}

getImgs(`${HOST}${BING_QUERY_API}${BING_QUERY_PARAMS}`)

//init()

