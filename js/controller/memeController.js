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
        fillText(memeDetails, gCtx)
    }
    updateMemeTextInput()
}

renderStickers()

function renderStickers() {
    let gStickerIdx = 0
    // const stickers = getStickers()
    const stickers = ['<i class="fa-solid fa-face-grin-tongue-squint"></i>', '<i class="fa-solid fa-face-grin-tongue-squint"></i>', '<i class="fa-solid fa-face-grin-tongue-squint"></i>', '<i class="fa-solid fa-face-grin-tongue-squint"></i>']
    const elStickerContainer = document.querySelector('.stickers-row-container')
    let stickerHtml = ''
    for (let i = 0; i < STICKER_SIZE; i++) {
        if (gStickerIdx + STICKER_SIZE >= stickers.length) {
            gStickerIdx = 0
        }
        const sticker = stickers[gStickerIdx]
        stickerHtml += `${sticker}`
        gStickerIdx++
    }
    elStickerContainer.innerHTML = `${stickerHtml}`
}

function onPrevStickers() {
    gStickerIdx -= STICKER_SIZE
    if (gStickerIdx < 0) {
        gStickerIdx = gStickers.length - STICKER_SIZE
    }
    renderStickers()
}

function onNextStickers() {
    gStickerIdx += STICKER_SIZE
    if (gStickerIdx >= gStickers.length) {
        gStickerIdx = 0
    }
    renderStickers()
}


function updateMemeTextInput() {
    const memes = getMeme()
    const inputText = (memes.lines[memes.selectedLineIdx].txt) ? memes.lines[memes.selectedLineIdx].txt : ''
    const elInput = document.querySelector('.meme-text-input')
    elInput.value = inputText
}

function fillText(memeDetails, gCtx) {
    memeDetails.forEach((line, idx) => {
        gCtx.font = `${line.fontSize}px ${line.font}`
        gCtx.fillStyle = line.colorFill
        gCtx.strokeStyle = line.colorStroke
        gCtx.textAlign = line.align
        const canvasWidth = (!idx) ? gElCanvas.width / 2 : gElCanvas.width / 4
        const canvasHeight = (!idx) ? gElCanvas.height / 4 : gElCanvas.height / 2
        const memeString = (line.txt) ? line.txt : ''
        let lineWidth = gCtx.measureText(memeString).width
        while (lineWidth > gElCanvas.width) {
            line.fontSize -= 5
            gCtx.font = `${line.fontSize}px ${line.font}`
            lineWidth = gCtx.measureText(memeString).width
        }
        gCtx.fillText(memeString, canvasWidth, canvasHeight)
        gCtx.strokeText(memeString, canvasWidth, canvasHeight)
    })
}

function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('meme/jpeg')
    elLink.href = imgContent
    elLink.download = ('generatedMeme')
}

function onAddLine() {
    addLine()
    renderMeme()
}

function onSetText(str) {
    setText(str)
    updateMemeTextInput()
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
    updateMemeTextInput()
    renderMeme()
}

function onUploadImg() {
    uploadImg()
}

// function onSaveMeme() {
// const meme = getMeme()
//  saveMemetoStorage('memeDB', meme)
// }

function onGenerateRandomMeme() {
    generateRandomMeme()
    renderMeme()
}


function getFonts() {
    let elFontElement = document.querySelector('.select-font')
    let elFontOptionValues = [...elFontElement.options].map(o => o.value)
    return elFontOptionValues
}



