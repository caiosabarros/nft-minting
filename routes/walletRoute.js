// Needed Resources 
const express = require("express")
const router = new express.Router()
const utilities = require("../utilities")

router.get("status", (req, res) => {
    res.locals.walletConnected = req.session.walletConnected || false
    res.locals.walletAddress = req.session.walletAddress || null

    res.json({
        connected: res.locals.walletConnected,
        account: res.locals.walletAddress
    })
})

module.exports = router