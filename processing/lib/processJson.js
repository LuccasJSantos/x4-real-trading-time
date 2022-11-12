const R = require('ramda')
const { ifHas } = require('./utils')

/**
 * @param {{ production: number, price: number }} params 
 * @param {Object} json 
 * @returns
 */
function processJson(params) {
    return function (json) {
        const getFactoryWares = ware => Boolean(ware['@factoryname'])
        const getRequiredTransportType = ware => ['container', 'liquid', 'solid', 'gas'].includes(ware['@transport'])

        const mapPrices = ware => ({
            ...ware,
            price: {
                "@min":     Math.ceil(params.price * Number(ware.price['@min'])),
                "@average": Math.ceil(params.price * Number(ware.price['@average'])),
                "@max":     Math.ceil(params.price * Number(ware.price['@max'])),
            }
        })

        const mapProductionMap = map => ({
            ...map,
            "@time": Math.ceil(params.production * Number(map['@time'])),
        })

        const mapProductionList = list => list.map(mapProductionMap) 

        const mapProduction = ware => ({
            ...ware,
            production: Array.isArray(ware.production)
                ? mapProductionList(ware.production)
                : mapProductionMap(ware.production)
        })

        return {
            ...json,
            ware: json.ware
                .filter(getFactoryWares)
                .filter(getRequiredTransportType)
                .map(ifHas ('price') (R.identity, mapPrices))
                .map(ifHas ('production') (R.identity, mapProduction))
        }
    }
}

module.exports = processJson