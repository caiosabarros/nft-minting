// Needed Resources 
const express = require("express")
const ethers = require("ethers")
const router = new express.Router()
const utilities = require("../utilities")

router.get("/status", (req, res) => {
    res.locals.walletConnected = req.session.walletConnected || false
    res.locals.walletAddress = req.session.walletAddress || null
    console.log("/status", res.locals)
    res.json({
        connected: res.locals.walletConnected,
        account: res.locals.walletAddress
    })
})

router.post("/create", async (req, res) => {
    try {
        const account = ethers.Wallet.createRandom()
        req.session.walletAddress = account.address
        req.session.walletConnected = true

        // set cookie
        res.cookie('walletAddress', account.address, {
            httpOnly: true,
            secure: process.env.NODE_ENV == 'production',
            maxAge: 1 * 60 * 60 * 1000
        })

        return res.json({
            success: true,
            walletConnected: true,
            walletAddress: account.address
        })
    } catch (error) {
        console.error("error: " + error)
    }
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
        // in each request these will be grabbed from the session.sid 
        req.session.walletAddress = account.walletAddress
        req.session.walletConnected = true

        // set cookie
        res.cookie('walletAddress', account.walletAddress, {
            httpOnly: true,
            secure: process.env.NODE_ENV == 'production',
            maxAge: 1 * 60 * 60 * 1000
        })

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