const R = require('ramda')

function ifHas(prop) {
    return (fnF, fnT) => obj => 
        R.ifElse (R.has (prop))
                 (fnT)
                 (fnF)
                 (obj)
}

module.exports = {
    ifHas
}
