function mintNFT() {
    /*
    Functionality (SERVER-SIDE):
    1) connect to the right network - ethers and alchemy (from .env) -> user doesn't need to connect 
    to the right network since I will be only sending him his NFT
    */
    // get the connected account on the server
    const response = await fetch("/nft/create", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            walletAddress: accounts[0],
        })
    })

    /*
    2) get a random image to the user from the below API
    - https://random.imagecdn.app/v1/image?width=150&height=150&category=monkey&format=json
    which returns the JSON:
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

    3) build the metadata
    
    get the contract - through ethers
    call the function in the contract from an allowed minter account (from .env file)
    pass user's account as parameter
    listen to response, once response has been given, show modal to the user with the NFT pic he's got
    */
    console.log("mintNFT()")
}
