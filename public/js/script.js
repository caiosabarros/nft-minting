async function checkWalletStatus() {
    const response = await fetch("/wallet/status")
    if (response.connected && response.account) {
        const connectWalletButton = document.getElementById("connect-wallet")
        connectWalletButton.innerHTML = response.account
        return true
    }

    return false
}

async function initMetamask() {
    const MMSDK = new MetaMaskSDK.MetaMaskSDK({
        dappMetadata: {
            name: "R4ND0M NFT Minting App",
            url: 'http://localhost',
        },
        infuraAPIKey: process.env.INFURA_API_KEY,
        // Other options.
    })
    MMSDK.connect()
}

async function connectWallet() {
    const isWalletConnected = await checkWalletStatus()
    if (!isWalletConnected) {
        const metamaskWallet = await initMetamask()
    }
}

const connectWalletButton = document.querySelector("#wallet-connect")
connectWalletButton.addEventListener("click", connectWallet)

// every time the page loads, we check the wallet status
// document.addEventListener("DOMContentLoaded", checkWalletStatus);