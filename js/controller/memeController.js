'use strict'

const gElCanvas = document.querySelector('#my-canvas')
let gCtx
let gEmojiIdx = 0

const EMOJI_SIZE = 4
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function renderMeme() {
    const gCtx = gElCanvas.getContext('2d')
    const memes = getMeme()
    const memeDetails = memes.lines
    const elImg = new Image()
    elImg.src = `images/${memes.selectedImgId}.jpg`
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        fillTextinCanvas(memeDetails, gCtx)
        const selectedEmojiID = memes.selectedEmojis
        if (selectedEmojiID !== null) {
            const selectedEmoji = gEmojis[selectedEmojiID]
            gCtx.font = '30px arial'
            gCtx.fillText(selectedEmoji, gElCanvas.width / 2, gElCanvas.height / 2)
        }
    }
    updateMemeTextInput()
}

renderEmojisToDOM()

function renderEmojisToDOM() {
    const emojis = getEmojis()
    const elEmojiContainer = document.querySelector('.emojis-row-container')
    let emojiHTML = ''
    const startIndex = gEmojiIdx * EMOJI_SIZE
    const endIndex = startIndex + EMOJI_SIZE
    for (let i = startIndex; i < endIndex; i++) {
        if (i >= emojis.length) {
            break
        }
        const emoji = emojis[i]
        emojiHTML += `<div class="emoji" onclick="onSelectEmoji(${i})">${emoji}</div>`
    }
    elEmojiContainer.innerHTML = `${emojiHTML}`
}

function onSelectEmoji(idx) {
    selectEmoji(idx)
    console.log('5')
    renderMeme()
}

function onPrevEmojis() {
    gEmojiIdx--
    if (gEmojiIdx < 0) {
        gEmojiIdx = (getEmojis().length / EMOJI_SIZE) - 1
    }
    renderEmojisToDOM()
}

function onNextEmojis() {
    gEmojiIdx++
    if (gEmojiIdx >= (getEmojis().length / EMOJI_SIZE)) {
        gEmojiIdx = 0
    }
    renderEmojisToDOM()
}


function onToggleMenu() {
    document.body.classList.toggle('menu-open')
    const elBtn = document.querySelector('.menu-button')
    elBtn.innerText = (elBtn.innerText === '☰') ? 'X' : '☰'
}


function updateMemeTextInput() {
    const memes = getMeme()
    const inputText = (memes.lines[memes.selectedLineIdx].txt) ? memes.lines[memes.selectedLineIdx].txt : ''
    const elInput = document.querySelector('.meme-text-input')
    elInput.value = inputText
}

function fillTextinCanvas(memeDetails, gCtx) {
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
        let lineHeight = line.fontSize * 1.286;
        const textX = canvasWidth - (lineWidth / 2);
        const textY = canvasHeight + (lineHeight / 2);
        gCtx.fillText(memeString, textX, textY);
        gCtx.strokeText(memeString, textX, textY);

        // Draw the rect around the text
        gCtx.beginPath();
        gCtx.rect(textX, canvasHeight, lineWidth, lineHeight);
        gCtx.stroke();
    });
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



function getFonts() {
    let elFontElement = document.querySelector('.select-font')
    let elFontOptionValues = [...elFontElement.options].map(o => o.value)
    return elFontOptionValues
}



