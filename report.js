function printReport(pages){
    console.log("====================")
    console.log("Report")
    console.log("====================")

    const sortedPages = sortPages(pages)

    for(const page of sortedPages){
        const url = page[0]
        const count = page[1]

        console.log(`Found ${count} links to page ${url}`)
    }

    console.log("====================")
}

function sortPages(pages){
    const pagesArr = Object.entries(pages)
    pagesArr.sort((a, b) => b[1] - a[1])

    return pagesArr
}

module.exports = {
    printReport,
    sortPages
}