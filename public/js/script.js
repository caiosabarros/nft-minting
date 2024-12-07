async function checkWalletStatus() {
    const response = await fetch("/wallet/status")
    const data = response.json()
    if (data.connected) {
        document.getElementById()
    }
}



// every time the page loads, we check the wallet status
document.addEventListener("DOMContentLoaded", checkWalletStatus);