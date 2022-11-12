const R = require('ramda')
const { ifHas } = require('./utils')

/**
 * @param {Record<string, any>} json 
 * @returns 
 */
function processDiff(json) {
    const generatePrices = ware => ([ 
        {
            "@sel": `/wares/ware[@id='${ware['@id']}']/price/@min`,
            "#text": String(ware.price['@min'])
        },
        {
            "@sel": `/wares/ware[@id='${ware['@id']}']/price/@average`,
            "#text": String(ware.price['@average'])
        },
        {
            "@sel": `/wares/ware[@id='${ware['@id']}']/price/@max`,
            "#text": String(ware.price['@max'])
        },
    ])

    const generateProduction = ware => {
        if (Array.isArray(ware.production)) {
            return ware.production.map(production => ({
                "@sel": `/wares/ware[@id='${ware['@id']}']/production[@method='${production['@method']}']/@time`,
                "#text": String(production['@time'])
            }))
        }

        return [{
            "@sel": `/wares/ware[@id='${ware['@id']}']/production[@method='${ware.production['@method']}']/@time`,
            "#text": String(ware.production['@time'])
        }]
    }

    const processed = json.ware.reduce((acc, ware) => {
        const prices = ifHas ('price') (() => [], generatePrices) (ware)
        const productions = ifHas ('production') (() => [], generateProduction) (ware)

        return [ ...acc, ...prices, ...productions ]
    }, [])

    return processed
}

module.exports = processDiff
