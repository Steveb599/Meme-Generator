'use strict'

const gElCanvas = document.querySelector('#my-canvas')
let gCtx

const STICKER_SIZE = 4
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']


function renderMeme() {
    const gCtx = gElCanvas.getContext('2d')
    const memes = getMeme()
    const memeDetails = memes.lines
    const elImg = new Image()
    elImg.src = `images/${memes.selectedImgId}.jpg`
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        memeDetails.forEach((line, idx) => {
            gCtx.font = `${line.fontSize}px ${line.font}`
            gCtx.fillStyle = line.colorFill
            gCtx.strokeStyle = line.colorStroke
            gCtx.textAlign = line.align
            const canvasWidth = (!idx) ? gElCanvas.width / 2 : gElCanvas.width / 4
            const canvasHeight = (!idx) ? gElCanvas.height / 4 : gElCanvas.height / 2
            const memeString = (line.txt) ? line.txt : ''
            gCtx.fillText(memeString, canvasWidth, canvasHeight)
            gCtx.strokeText(memeString, canvasWidth, canvasHeight)
        })
    }
}

function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('meme/jpeg')
    elLink.href = imgContent
    elLink.download = ('meme')
}


function onSetText(str) {
    setText(str)
    renderMeme()
}

// function onShowMemeEditor() {
//     const elMemeEditor = document.querySelector('.meme-editor')
//     const elImageGallery = document.querySelector('.image-gallery')
//     elMemeEditor.hidden = true
//     elImageGallery.hidden = false
// }

function onSetFillColor(color) {
    setFillColor(color)
    renderMeme()
}

function onSetStrokeColor(color) {
    setStrokeColor(color)
    renderMeme()
}

function onChangeFontSize(num) {
    ChangeFontSize(num)
    renderMeme()
}

function onChangeFont(font) {
    changeFont(font)
    renderMeme()
}

function onDeleteText() {
    deleteText()
    renderMeme()
}

function onChangeAlignText(align) {
    changeAlignText(align)
    renderMeme()
}

function onSwitchBetweenLines() {
    switchbetweenLines()
    renderMeme()
}

function onSaveMeme() {
    saveMeme()
}