const BingPic = require('mongodb')

const PICNUM = 8
const HOST = 'https://cn.bing.com'
const BING_QUERY_API = '/HPImageArchive.aspx?'
const BING_QUERY_PARAMS = `format=js&idx=0&n=${PICNUM}`

const getImgs = function(url){
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
        let dailyImages = []
        res.images.foreach((item, index) => {
            dailyImages.push(
                new BingPic({
                    url: `${HOST}${item.url}`,
                    urlbase: `${HOST}${item.baseurl}`,
                    name: item.urlbase.match(/\w+(?=_)/g)[0],
                    copyright: item.copyright,
                    startdate: item.startdate,
                    fullstartdate: item.fullstartdate
                })
            )
        }) 
    }).on('error', (e) => {
        console.error(`Got error: ${e.message}`)
    })
}

const saveImgs = async (images) => {
    for (let i = 0; i < images.length; i++) {
        const docs = await BingPic.find({ name: images[i].name })
        if (docs.length === 0) {
            await images[i].save()
        }
    }
}

const init = async () => {
    const image = getImgs(`${HOST}${BING_QUERY_API}${BING_QUERY_PARAMS}`)
    await saveImgs(iamges)
    mongoose.disconnect()
}

init()