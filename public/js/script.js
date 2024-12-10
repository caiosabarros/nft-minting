async function mintNFT() {
    const response = await fetch("/nft/create", {
        method: 'POST'
    })

    const data = await response.json()
    console.log("response.json()", data)
    console.log("txHas", data.transactionHash)
}
