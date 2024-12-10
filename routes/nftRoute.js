// Needed Resources 
const express = require("express")
const ethers = require("ethers")
const router = new express.Router()
require("dotenv").config()
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
    // connect to the amoy blockchain
    console.log("KEY", process.env.INFURA_API_KEY)
    const provider = new ethers.providers.AlchemyProvider(process.env.AMOY_CHAIN_ID, process.env.INFURA_API_KEY)
    try {
        // call the api endpoint
        const apiURL = "https://random.imagecdn.app/v1/image?width=150&height=150&category=monkey&format=json"
        const randomImageResponse = await fetch(apiURL)
        if (!randomImageResponse.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        /*
        JSON has the format:
        {
            "provider": "LoremPicsum",
            "license": "CC0",
            "terms": "https://picsum.photos/",
            "url": "https://fastly.picsum.photos/id/773/150/150.jpg?hmac=rBsUceWTXAVWFdq5u7C0-hRXtXwtyeAHThljSKyYT20",
            "size": {
                "height": "150",
                "width": "150"
            }
        }
        */
        const json = await response.json();


        // generate the tokenId randomly
        const nftId = parseInt(Math.random() * 10000)
        // build the NFT metadata
        const nftMetadata = {
            name: `R4ND0M WDD330 NFT #${nftId}`,
            image: `${json['url']}`
        }

        // connect to the contract and mint the nft
        const nftSmartContract = new ethers.Contract(utilities.CONSTANTS.NFT_ADDRESS, utilities.CONSTANTS.NFT_ABI, provider)
        const signer = new ethers.Wallet(privateKey, provider)
        const signedSmartContract = nftSmartContract.connect(signer)
        if (!res.locals.walletAddress || res.locals.walletAddress == ethers.constants.AddressZero) {
            throw new Error("Wallet Address is not defined");
        }
        const transaction = await signedSmartContract.mint(res.locals.walletAddress, nftMetadata.name, nftMetadata.image)

        const receipt = await transaction.wait()
        console.log("receipt", receipt)

        return receipt
    } catch (error) {
        console.error(error.message);
    }
})

module.exports = router