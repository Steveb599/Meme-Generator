'use strict'

let gImgs = []

createImgs()

function getImgs() {
    return gImgs
}

function createImgs() {
    for (let i = 0; i < 18; i++) {
        gImgs.push({
            id: i + 1,
            url: `<img src="images/${i + 1}.jpg" id=${i + 1} onclick="onImgSelect(id)">`,
            keywords: ['funny', 'cat']
        });
    }
}

function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

// CallBack func will run on success load of the img
function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    // After we read the file
    reader.onload = function (event) {
        let img = new Image() // Create a new html img element
        img.src = event.target.result // Set the img src to the img file we read
        // Run the callBack func, To render the img on the canvas
        img.onload = onImageReady.bind(null, img)
        // Can also do it this way:
        // img.onload = () => onImageReady(img)
    }
    reader.readAsDataURL(ev.target.files[0]) // Read the file we picked
}



