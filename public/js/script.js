async function mintNFT() {
    const response = await fetch("/nft/create", {
        method: 'POST'
    })

    const data = await response.json()
    // console.log("hash?", data) // {transactionHash: '0xab7f191b0b2252896ea7537d67b1979ff994a0f864303784a79aed9ac78a5fe0'}

    // TODO: do modal thing here to display stuff. May be display in the place of the Mint Now button?
}
