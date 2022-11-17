const R = require('ramda')
const { ifHas, attrsPrice, attrsProduction } = require('./utils')

/**
 * @param {Record<string, any>} json 
 * @returns 
 */
function processDiff(json) {
    const generatePrices = ware => ([ 
        {
            attrs: {
                sel: `/wares/ware[@id='${ware.attrs.id}']/price/@min`,
            },
            _text: String(ware.price.attrs.min)
        },
        {
            attrs: {
                sel: `/wares/ware[@id='${ware.attrs.id}']/price/@average`,
            },
            _text: String(ware.price.attrs.average)
        },
        {
            attrs: {
                sel: `/wares/ware[@id='${ware.attrs.id}']/price/@max`,
            },
            _text: String(ware.price.attrs.max)
        },
    ])

    const generateProduction = ware => {
        if (Array.isArray(ware.production)) {
            return ware.production.map(production => ({
                attrs: {
                    sel: `/wares/ware[@id='${ware.attrs.id}']/production[@method='${production.attrs.method}']/@time`,
                },
                _text: String(production.attrs.time)
            }))
        }

        return [{
            attrs: {
                sel: `/wares/ware[@id='${ware.attrs.id}']/production[@method='${ware.production.attrs.method}']/@time`,
            },
            _text: String(ware.production.attrs.time)
        }]
    }

    const processed = json.wares.ware.reduce((acc, ware) => {
        const prices = ifHas ('price') (() => [], generatePrices) (ware)
        const productions = ifHas ('production') (() => [], generateProduction) (ware)

        return [ ...acc, ...prices, ...productions ]
    }, [])

    return {
        _declaration: json._declaration,
        diff: {
            attrs: {
                "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
            },
            replace: processed,
        },
    }
}

module.exports = processDiff
