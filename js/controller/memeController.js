'use strict'

let gElCanvas
let gCtx

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

renderMeme()

function renderMeme() {
    gElCanvas = document.querySelector('#my-canvas')
    gCtx = gElCanvas.getContext('2d')
    const elImg = new Image() // Create a new html img element
    elImg.src = 'images/5.jpg'
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        gCtx.font = "30px Poppins"
        gCtx.fillStyle = "black"
        gCtx.textAlign = "center"
        gCtx.fillText("This is a test", gElCanvas.width / 2, gElCanvas.height / 2);
    }

}

