const walletConnection = require("@metamask/sdk")
let Util = {}

Util.initMetamask = async function () {
    console.log("init")
    console.log(":walletConnection", walletConnection)
    const MMSDK = new walletConnection.MetaMaskSDK({
        dappMetadata: {
            name: "R4ND0M NFT Minting App",
            url: 'http://localhost',
        },
        infuraAPIKey: process.env.INFURA_API_KEY,
        // Other options.
    })
    console.log(":MMSDK", MMSDK)

    const accounts = await MMSDK.connect()
    const provider = MMSDK.getProvider()
    provider.request({ method: "eth_accounts", params: [] })

    // --- store local variables
}

Util.checkMetamask = function (req, res, next) {
    // if both are truthful, then just move on
    console.log("req.session", req.session)
    if (req.session.walletConnected && req.session.walletAccount) {
        res.locals.walletConnected = true;
        res.locals.walletAccount = req.session.walletAccount;
        // if some of them is not truthful, reinit
    } else {
        res.locals.walletConnected = false;
        res.locals.walletAccount = null;
    }
    next();
};

module.exports = Util