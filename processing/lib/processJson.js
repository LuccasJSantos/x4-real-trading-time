const R = require('ramda')
const { ifHas } = require('./utils')

function processJson(json) {
    const getFactoryWares = ware => Boolean(ware['@factoryname'])
    const getRequiredTransportType = ware => ['container', 'liquid', 'solid', 'gas'].includes(ware['@transport'])

    const mapPrices = ware => ({
        ...ware,
        price: {
            "@min":     Math.ceil(1.10 * Number(ware.price['@min'])),
            "@average": Math.ceil(1.10 * Number(ware.price['@average'])),
            "@max":     Math.ceil(1.10 * Number(ware.price['@max'])),
        }
    })

    const mapProductionMap = map => ({
        ...map,
        "@time": Math.ceil(1.10 * Number(map['@time'])),
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

module.exports = processJson