const R = require('ramda')
const { xml2json, json2xml } = require('xml-js')

const processJson = require('./lib/processXML')
const processDiff = require('./lib/processDiff')
const { nodeSetup, readXMLFile, saveJSONFile, saveFile } = require('./lib/utils')

const node = nodeSetup({
    customArgs: {
        price: "1.09",
        production: "1.02",
        in: "./data/wares.xml",
        out: "../libraries/wares.xml",
    },
})

const xmlOptions = {
    attributesKey: 'attrs',
    compact: true,
    spaces: 2,
}

function main() {
    return readXMLFile(process.customArgs.in) 
        .then(xml => xml2json(xml, xmlOptions))
        .then(R.tap(saveFile('./data/wares-origin.json')))
        .then(JSON.parse)
        .then(processJson({
            price: Number(process.customArgs.price),
            production: Number(process.customArgs.production)
        }))
        .then(processDiff)
        .then(R.tap(saveJSONFile('./data/wares-result.json')))
        .then(json => json2xml(JSON.stringify(json), xmlOptions))
        .then(saveFile(process.customArgs.out))
        .then(() => console.log('Done'))
        .catch((error) => console.error({ error }))
}

node(main)
