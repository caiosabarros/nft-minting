const utilities = require("../utilities/")
const baseController = {}


baseController.buildHome = async function (req, res) {
    res.render("index", { layout: "./layouts/layout" })
}

baseController.internalError = async function (req, res, next) {
    try {
        throw new Error('Intentional 500 error for testing'); // Generate the error
    } catch (error) {
        next(error); // pass the error down to the error middleware
    }
}

module.exports = baseController