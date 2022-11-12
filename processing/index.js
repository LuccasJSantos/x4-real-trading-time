const fs = require('fs').promises
const processJson = require('./lib/processJson')
const processDiff = require('./lib/processDiff')

function main() {
    return fs.readFile('./data/wares.json', 'utf-8')
        .then(JSON.parse)
        .then(processJson({
            price: 1.09,
            production: 1.07
        }))
        .then(processDiff)
        .then(json => JSON.stringify(json, null, 4))
        .then(json => fs.writeFile('./data/wares-adjusted.json', json))
        .then(() => console.log('Done'))
        .catch((error) => console.error({ error }))
}

main()
