function normalizeURL(urlString){
    const urlObj = new URL(urlString)
    const modifiedUrl = `${urlObj.hostname}${urlObj.pathname}`

    if(modifiedUrl.length > 0 && modifiedUrl.slice(-1) === '/'){
        return modifiedUrl.slice(0, -1)
    }

    return modifiedUrl
}

module.exports = {
    normalizeURL
}