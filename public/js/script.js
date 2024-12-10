async function mintNFT() {
    const response = await fetch("/nft/create", {
        method: 'POST'
    })

    const data = await response.json()
    // console.log("hash?", data) // {transactionHash: '0xab7f191b0b2252896ea7537d67b1979ff994a0f864303784a79aed9ac78a5fe0'}

    // TODO: do modal thing here to display stuff. May be display in the place of the Mint Now button?
}

const img = document.querySelector(".main-list img")
function handleData(data) {
    img.setAttribute("src", data.url)
}

const apiURL = "https://random.imagecdn.app/v1/image?width=150&height=150&category=monkey&format=json"
setInterval(() => {
    fetch(apiURL)
        .then(res => res.json())
        .then(data => {
            handleData(data);  // Pass the data to the handleData function
        })
}, 4000);