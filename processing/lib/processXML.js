const R = require('ramda')
const { ifHas, attrsPrice, attrsProduction } = require('./utils')

/**
 * @param {{ production: number, price: number }} params 
 * @param {Object} xmlJSON 
 * @returns
 */
function processXML(params) {
    return function (xmlJSON) {
        const getFactoryWares = ware => Boolean(ware.attrs.factoryname)
        const getRequiredTransportType = ware => ['container', 'liquid', 'solid', 'gas'].includes(ware.attrs.transport)

        const mapPrices = ware => ({
            ...ware,
            price: {
                attrs: {
                    test: ware.price.attrs.min,
                    min:     Math.ceil(params.price * ware.price.attrs.min),
                    average: Math.ceil(params.price * ware.price.attrs.average),
                    max:     Math.ceil(params.price * ware.price.attrs.max),
                }
            }
        })

        const mapProductionTimeMap = map => ({
            ...map,
            attrs: {
                ...map.attrs,
                time: Math.ceil(params.production * map.attrs.time),
            }
        })

        const mapProductionTimeList = list => list.map(mapProductionTimeMap) 

        const mapProductionTime = ware => ({
            ...ware,
            production: Array.isArray(ware.production)
                ? mapProductionTimeList(ware.production)
                : mapProductionTimeMap(ware.production)
        })

        return {
            ...xmlJSON,
            wares: {
                ...xmlJSON.wares,
                ware: R.pipe(
                    R.filter(getFactoryWares),
                    R.filter(getRequiredTransportType),
                    R.map(ifHas ('price') (R.identity, mapPrices)),
                    R.map(ifHas ('production') (R.identity, mapProductionTime)),
                )(xmlJSON.wares.ware)
            }
        }
    }
}

module.exports = processXML