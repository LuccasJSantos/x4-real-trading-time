const R = require('ramda')
const fs = require('fs').promises

const ifHas = (prop) => {
    return (fnF, fnT) => obj => 
        R.ifElse (R.has (prop))
                 (fnT)
                 (fnF)
                 (obj)
}

const nodeSetup = (options) => {
    const userArgs = process.argv.slice(2)

    const mapArgsEntries = R.pipe(
        R.map(R.adjust(0, R.replace(/-/g, ''))),
        R.fromPairs) 

    const argsEntries = R.splitEvery(2, userArgs)
    const argsMapped = mapArgsEntries(argsEntries)
    const argsObject = { ...options.customArgs, ...argsMapped }

    process.customArgs = argsObject

    return (fn) => fn()
}

const saveFile = (filename) => (data) => fs.writeFile(filename, data)

const readFile = (filename) => fs.readFile(filename, 'utf-8')

const saveJSONFile = (filename) => (json) => saveFile(filename)(JSON.stringify(json, null, 2))

const readXMLFile = (filename) => readFile(filename)

const attrsPrice = R.path(['attrs', 'price'])
const attrsProduction = R.path(['attrs', 'production'])

module.exports = {
    attrsPrice,
    attrsProduction,
    ifHas,
    nodeSetup,
    readFile,
    saveFile,
    readXMLFile,
    saveJSONFile,
}
