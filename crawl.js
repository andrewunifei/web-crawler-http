const { JSDOM } = require('jsdom')

async function crawlPage(url){
    console.log(`We're crawling ${url}`)

    try{
        const res = await fetch(url, {
            method: 'GET',
            mode: 'cors'
        }) 

        if(res.status > 399){
            console.log(`Error in fetch with status code ${res.status}, on page ${url}`)
            return
        }

        const contentType = res.headers.get('content-type')

        if(!contentType.includes('text/html')){
            console.log(`Non HTML response. Content-Type is ${contentType}, on page ${url}`)
            return
        }

        console.log(await res.text())
    } catch(err){
        console.log(`Error in fetch: ${err.message}, on page ${url}`)
    }
}

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
    crawlPage,
    normalizeURL,
    getURLsFromHTML
}