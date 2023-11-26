const { JSDOM } = require('jsdom')

function getURLsFromHTML(HTMLBody, baseURL){
    const urls = []
    const dom = new JSDOM(HTMLBody)
    const anchorElements = dom.window.document.querySelectorAll('a')

    for(const anchor of anchorElements){
        if(anchor.href.slice(0,1) === '/'){
            // URL relativa
            try{
                urlObj = new URL(`${baseURL}${anchor.href}`)

                urls.push(urlObj.href)
            } catch(err){
                console.log(`Error with relative URL: ${err.message}`)
            }
        }
        else{
            // URL absoluta
            try{
                urlObj = new URL(anchor.href)

                urls.push(urlObj.href)
            } catch(err){
                console.log(`Error with absolute URL: ${err.message}`)
            }
        }
    }

    return urls
}

function normalizeURL(urlString){
    const urlObj = new URL(urlString)
    const modifiedUrl = `${urlObj.hostname}${urlObj.pathname}`

    if(modifiedUrl.length > 0 && modifiedUrl.slice(-1) === '/'){
        return modifiedUrl.slice(0, -1)
    }

    return modifiedUrl
}

module.exports = {
    normalizeURL,
    getURLsFromHTML
}