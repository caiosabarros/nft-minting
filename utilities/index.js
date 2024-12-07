const walletConnection = require("@metamask/sdk")
let Util = {}

Util.initMetamask = async function () {
    return new walletConnection.MetaMaskSDK({
        dappMetadata: {
            name: "R4ND0M NFT Minting App",
            url: 'http://localhost',
        },
        infuraAPIKey: process.env.INFURA_API_KEY,
        // Other options.
    })
}

Util.connectMetamask = function (req, res, next) {
    // if both are truthful, then just move on
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