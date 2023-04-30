'use strict'

let gElCanvas = document.querySelector('#my-canvas')
let gEmojiIdx = 0
const EMOJI_SIZE = 4
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend', 'mousedown', 'mousemove', 'mouseup']
const gCtx = gElCanvas.getContext('2d')
let gStartPos = {}
const meme = getMeme()
const memeDetails = meme.lines

function onInitMemeEditor() {
    addMouseListeners()
    addTouchListeners()
    renderEmojisToDOM()
    renderSavedMemes()
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    // Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    if (isLineClicked(pos)) {
        setLineDrag(true)
        //Save the pos we start from
        gStartPos = pos
        document.body.style.cursor = 'grabbing'
    }
    // else if (isEmojiClicked(pos)) {
    //     setEmojiDrag(true);
    //     gStartPos = pos;
    //     document.body.style.cursor = 'grabbing';
}


function onMove(ev) {
    const { isDrag } = getMeme().lines[gMeme.selectedLineIdx]
    if (!isDrag) return

    const pos = getEvPos(ev)
    // Calc the delta , the diff we moved
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    if (dx > gElCanvas.width || dy > gElCanvas.height) return
    moveLine(dx, dy)
    // Save the last pos , we remember where we`ve been and move accordingly
    gStartPos = pos
    // The canvas is render again after every move
    renderMeme()
}

function onUp() {
    setLineDrag(false)
    document.body.style.cursor = 'default'
}


function getEvPos(ev) {
    // Gets the offset pos , the default pos
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    // Check if its a touch ev
    if (ev.type.startsWith('touch')) {
        //soo we will not trigger the mouse ev
        ev.preventDefault()
        //Gets the first touch point
        ev = ev.changedTouches[0]
        //Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}


function renderMeme(img) {
    const currMeme = getMeme()
    let elImg = new Image()
    if (img) {
        elImg = img
    } else if (currMeme.selectedImgId !== null) {
        elImg.src = `images/${currMeme.selectedImgId}.jpg`
    }
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        fillTextinCanvas(currMeme.lines, gCtx)
    }
    if (currMeme.selectedImgId === null) {
        fillTextinCanvas(currMeme.lines, gCtx)
    }
    updateMemeTextInput()
}

function renderEmojisOnCanvas() {
    const currMeme = getMeme()
    const selectedEmoji = currMeme.lines[currMeme.lines.length - 1].txt
    gCtx.font = '30px arial'
    gCtx.fillText(selectedEmoji, gElCanvas.width / 2, gElCanvas.height / 2)
}


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
    renderEmojisOnCanvas()
}

function onPrevEmojis() {
    gEmojiIdx--
    if (gEmojiIdx < 0) {
        gEmojiIdx = getEmojis().length / EMOJI_SIZE - 1
    }
    renderEmojisToDOM()
}

function onNextEmojis() {
    gEmojiIdx++
    if (gEmojiIdx >= getEmojis().length / EMOJI_SIZE) {
        gEmojiIdx = 0
    }
    renderEmojisToDOM()
}

function onToggleMenu() {
    document.body.classList.toggle('menu-open')
    const elBtn = document.querySelector('.menu-button')
    elBtn.innerText = elBtn.innerText === '☰' ? 'X' : '☰'
}

function updateMemeTextInput() {
    const memes = getMeme()
    const inputText = memes.lines[memes.selectedLineIdx].txt ? memes.lines[memes.selectedLineIdx].txt : ''
    const elInput = document.querySelector('.meme-text-input')
    elInput.value = inputText
}

function fillTextinCanvas(memeDetails, gCtx) {
    memeDetails.forEach(line => {
        gCtx.font = `${line.fontSize}px ${line.font}`
        gCtx.fillStyle = line.colorFill
        gCtx.strokeStyle = line.colorStroke
        gCtx.textAlign = line.align
        const canvasWidth = line.pos.x
        const canvasHeight = line.pos.y
        const memeString = line.txt ? line.txt : ''
        let lineWidth = gCtx.measureText(memeString).width
        while (lineWidth > gElCanvas.width) {
            line.fontSize -= 5
            gCtx.font = `${line.fontSize}px ${line.font}`
            lineWidth = gCtx.measureText(memeString).width
        }
        let lineHeight = line.fontSize * 1.286
        const textY = canvasHeight + lineHeight / 2
        gCtx.fillText(memeString, canvasWidth, textY)
        gCtx.strokeText(memeString, canvasWidth, textY)

        gCtx.beginPath()
        if (memeString.length > 0 || (memeDetails.isSave)) {
            switch (line.align) {
                case 'center':
                    gCtx.rect(
                        canvasWidth - lineWidth / 2,
                        canvasHeight - 0.5 * line.fontSize,
                        lineWidth,
                        lineHeight
                    );
                    break;
                case 'end':
                    gCtx.rect(
                        canvasWidth - lineWidth,
                        canvasHeight - 0.5 * line.fontSize,
                        lineWidth,
                        lineHeight
                    );
                    break;
                case 'start':
                    gCtx.rect(
                        canvasWidth,
                        canvasHeight - 0.5 * line.fontSize,
                        lineWidth,
                        lineHeight
                    );
                    break;
                default:
                    break;
            }
        }

        gCtx.stroke()
    })
}

function downloadImg(elLink) {
    gElCanvas = document.querySelector('#my-canvas')
    // onChangeRect()
    renderMeme()
    const imgContent = gElCanvas.toDataURL()
    elLink.href = imgContent
    elLink.download = 'generatedMeme.jpg'
}

function onAddLine() {
    addLine()
    fillTextinCanvas(memeDetails, gCtx)
    updateMemeTextInput()
}

function onSetText(str) {
    setText(str)
    updateMemeTextInput()
    renderMeme()
}

function onChangeFontSize(num) {
    ChangeFontSize(num)
    renderMeme()
}

function onSetFillColor(color) {
    setFillColor(color)
    renderMeme()
}

function onChangeFont(font) {
    changeFont(font)
    renderMeme()
}

function onSetStrokeColor(color) {
    setStrokeColor(color)
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

function onSaveMeme() {
    saveMeme(gElCanvas.toDataURL('meme/png'))
    renderSavedMemes()
}

function onEditSavedMeme(id) {
    updateMemeFromSaved(id)
    onShowMemeEditor()
    renderMeme()
}

function renderSavedMemes() {
    const savedMemes = getSavedMemes()
    const elSavedMemesContainer = document.querySelector('.saved-memes-container')
    elSavedMemesContainer.innerHTML = ''
    let strHtmls = savedMemes.map((savedMeme, idx) => `<div class="saved-image"><img src="${savedMeme.imgurl}" alt="" onclick="onEditSavedMeme(${idx})"><button class="btn btn-remove-saved" onclick="onDeleteSavedMeme(${idx})"><img src="ICONS/trash.png" alt="">></button></div>`)
    if (strHtmls.length) {
        elSavedMemesContainer.innerHTML = strHtmls.join('')
    }
    else {
        elSavedMemesContainer.dataset.trans = "saved-memes-message"
        doTrans()
    }
}

function getFonts() {
    let elFontElement = document.querySelector('.select-font')
    let elFontOptionValues = [...elFontElement.options].map((option) => option.value)
    return elFontOptionValues
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function onDeleteSavedMeme(idx) {
    deleteSavedMeme(idx)
}