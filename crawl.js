const { JSDOM } = require('jsdom')

async function crawlPage(baseURL, currentURL, pages){
    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)

    if(baseURLObj.hostname !== currentURLObj.hostname) return pages

    const normalizedCurrentURL = normalizeURL(currentURL)

    if(pages[normalizedCurrentURL] > 0){
        pages[normalizedCurrentURL]++

        return pages
    }

    pages[normalizedCurrentURL] = 1

    console.log(`We're crawling ${currentURL}`)

    try{
        const res = await fetch(currentURL, {
            method: 'GET',
            mode: 'cors'
        }) 

        if(res.status > 399){
            console.log(`Error in fetch with status code ${res.status}, on page ${currentURL}`)
            return pages
        }

        const contentType = res.headers.get('content-type')

        if(!contentType.includes('text/html')){
            console.log(`Non HTML response. Content-Type is ${contentType}, on page ${currentURL}`)
            return pages
        }

        const HTMLBody = await res.text()

        nextURLs = getURLsFromHTML(HTMLBody, baseURL)

        for(const nextURL of nextURLs){
            pages = await crawlPage(baseURL, nextURL, pages)
        }

    } catch(err){
        console.log(`Error in fetch: ${err.message}, on page ${currentURL}`)
    }

    return pages
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