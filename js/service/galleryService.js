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



