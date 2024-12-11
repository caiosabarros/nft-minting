async function mintNFT() {
    try {
        const response = await fetch("/nft/create", {
            method: 'POST'
        })

        const data = await response.json()

        createAndShowModal(data)
    } catch (err) {
        console.error("Error minting NFT:", err);
    }
}

function createAndShowModal(data) {
    // Check if modal already exists (to avoid duplicating it)
    let modal = document.querySelector(".modal");
    if (!modal) {
        // Create the modal's HTML structure dynamically
        modal = document.createElement("div");
        modal.classList.add("modal");

        modal.innerHTML = `
            <div class="modal__header">
                NFT CREATED
                <a href="#" class="js-close-modal">X</a>
            </div>
            <h3>${data.name}</h3>
            <img class="modal__image" src="${data.image}" alt="NFT Image">
            <p>Check out the <a target="_blank" class="modal__link" href="https://amoy.polygonscan.com/tx/${data.transactionHash}" target="_blank">transaction hash</a> on the Amoy blockchain</p>
            <small>You can <a target="_blank" href="https://testnets.opensea.io/assets/amoy/0x476ca7f0d65da86b989c678d4fb8de789079c65b/${data.nftId}" class="modal__link">view</a> your NFT on OpenSea!</small>
        `;

        // Append modal to the body
        document.body.appendChild(modal);

        // Initialize close events
        initializeModalEvents(modal);
    } else {
        // If the modal already exists, just update its content
        modal.querySelector("h3").textContent = `${data.name}`;
        modal.querySelector(".modal__image").src = data.image;
        modal.querySelector(".modal__link").href = data.transactionHash;
    }

    // Show the modal
    modal.classList.add("visible");
}

function initializeModalEvents(modal) {
    // Close modal on clicking the close button
    modal.querySelector(".js-close-modal").addEventListener("click", () => {
        modal.classList.remove("visible");
    });

    // Close modal if clicking outside the modal content
    document.addEventListener("click", (event) => {
        if (!event.target.closest(".modal")) {
            modal.classList.remove("visible");
        }
    });
}

const img = document.querySelector(".main-list img")
function handleData(data) {
    // change the src attribute to be the random image fetched from the API call
    img.setAttribute("src", data.url)
}

const apiURL = "https://random.imagecdn.app/v1/image?width=300&height=400&format=json"
setInterval(() => {
    fetch(apiURL)
        .then(res => res.json())
        .then(data => {
            handleData(data);
        })
}, 4000);

console.log("WORKING")