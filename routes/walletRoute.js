// Needed Resources 
const express = require("express")
const router = new express.Router()
const utilities = require("../utilities")

router.get("/status", (req, res) => {
    res.locals.walletConnected = req.session.walletConnected || false
    res.locals.walletAddress = req.session.walletAddress || null
    console.log("/status")
    res.json({
        connected: res.locals.walletConnected,
        account: res.locals.walletAddress
    })
})


router.post("/connect", async (req, res) => {
    try {
        const account = req.body

        if (!account.walletAddress) {
            return res.status(400).json({
                success: false,
                message: 'No wallet address available'
            })
        }

        // set the session variables
        req.session.walletAddress = account.walletAddress
        req.session.walletConnected = true

        // set cookie
        res.cookie('walletAddress', account.walletAddress, {
            httpOnly: true,
            secure: process.env.NODE_ENV == 'production',
            maxAge: 1 * 60 * 60 * 1000
        })
        // const wallet = await utilities.initMetamask()
        // console.log(wallet)
        // console.log("account", account)
        return res.json({
            success: true,
            walletConnected: true,
            walletAddress: account.walletAddress
        })
    } catch (err) {
        console.error("wrong: " + err)
    }
})

module.exports = router