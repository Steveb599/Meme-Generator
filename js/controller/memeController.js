'use strict';

const gElCanvas = document.querySelector('#my-canvas');
let gEmojiIdx = 0;
let gIsDragging = false
const EMOJI_SIZE = 4;
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend'];
const gCtx = gElCanvas.getContext('2d');
var gStartPos = {};
const memes = getMeme();
const memeDetails = memes.lines;
// addMouseListeners()

// function addMouseListeners() {
//     gElCanvas.addEventListener('mousedown', onDown);
//     gElCanvas.addEventListener('mousemove', onMove);
//     gElCanvas.addEventListener('mouseup', onUp);
// }

// function addTouchListeners() {
//     gElCanvas.addEventListener('touchstart', onDown);
//     gElCanvas.addEventListener('touchmove', onMove);
//     gElCanvas.addEventListener('touchend', onUp);
// }
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
    console.log('Down')
    // Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    // console.log('pos', pos)
    if (!isCircleClicked(pos)) return

    setLineDrag(true)
    //Save the pos we start from
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    console.log('Move')
    const { isDrag } = getCircle()
    if (!isDrag) return

    const pos = getEvPos(ev)
    // Calc the delta , the diff we moved
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveLine(dx, dy)
    // Save the last pos , we remember where we`ve been and move accordingly
    gStartPos = pos
    // The canvas is render again after every move
    renderCanvas()
}

function onUp() {
    console.log('Up')
    setLineDrag(false)
    document.body.style.cursor = 'grab'
}


function getEvPos(ev) {
    // Gets the offset pos , the default pos
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    // Check if its a touch ev
    if (TOUCH_EVS.includes(ev.type)) {
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
    let elImg = new Image();
    if (img) {
        elImg = img;
    } else if (memes.selectedImgId !== 19) {
        elImg.src = `images/${memes.selectedImgId}.jpg`;
    }
    console.log('999');
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
        fillTextinCanvas(memeDetails, gCtx);
        const selectedEmojiID = memes.selectedEmojis;
        if (selectedEmojiID !== null) {
            const selectedEmoji = gEmojis[selectedEmojiID];
            gCtx.font = '30px arial';
            gCtx.fillText(selectedEmoji, gElCanvas.width / 2, gElCanvas.height / 2);
        }
    };
    updateMemeTextInput();

}
// if (memes.selectedImgId === 19) {
//     console.log('555');
//     gCtx.fillText(
//         gMeme.lines[selectedLineIdx].txt,
//         gElCanvas.width / 2,
//         gElCanvas.height / 2,
//     );
// }



renderEmojisToDOM();

function renderEmojisToDOM() {
    const emojis = getEmojis();
    const elEmojiContainer = document.querySelector('.emojis-row-container');
    let emojiHTML = '';
    const startIndex = gEmojiIdx * EMOJI_SIZE;
    const endIndex = startIndex + EMOJI_SIZE;
    for (let i = startIndex; i < endIndex; i++) {
        if (i >= emojis.length) {
            break;
        }
        const emoji = emojis[i];
        emojiHTML += `<div class="emoji" onclick="onSelectEmoji(${i})">${emoji}</div>`;
    }
    elEmojiContainer.innerHTML = `${emojiHTML}`;
}

function onSelectEmoji(idx) {
    selectEmoji(idx);
    renderMeme();
}

function onPrevEmojis() {
    gEmojiIdx--;
    if (gEmojiIdx < 0) {
        gEmojiIdx = getEmojis().length / EMOJI_SIZE - 1;
    }
    renderEmojisToDOM();
}

function onNextEmojis() {
    gEmojiIdx++;
    if (gEmojiIdx >= getEmojis().length / EMOJI_SIZE) {
        gEmojiIdx = 0;
    }
    renderEmojisToDOM();
}

function onToggleMenu() {
    document.body.classList.toggle('menu-open');
    const elBtn = document.querySelector('.menu-button');
    elBtn.innerText = elBtn.innerText === '☰' ? 'X' : '☰';
}

function updateMemeTextInput() {
    const memes = getMeme();
    const inputText = memes.lines[memes.selectedLineIdx].txt
        ? memes.lines[memes.selectedLineIdx].txt
        : '';
    const elInput = document.querySelector('.meme-text-input');
    elInput.value = inputText;
}

function fillTextinCanvas(memeDetails, gCtx) {
    memeDetails.forEach(line => {
        gCtx.font = `${line.fontSize}px ${line.font}`;
        gCtx.fillStyle = line.colorFill;
        gCtx.strokeStyle = line.colorStroke;
        gCtx.textAlign = line.align;
        const canvasWidth = line.pos.x;
        const canvasHeight = line.pos.y;
        const memeString = line.txt ? line.txt : '';
        let lineWidth = gCtx.measureText(memeString).width;
        while (lineWidth > gElCanvas.width) {
            line.fontSize -= 5;
            gCtx.font = `${line.fontSize}px ${line.font}`;
            lineWidth = gCtx.measureText(memeString).width;
        }
        let lineHeight = line.fontSize * 1.286;
        const textY = canvasHeight + lineHeight / 2;
        gCtx.fillText(memeString, canvasWidth, textY);
        gCtx.strokeText(memeString, canvasWidth, textY);

        gCtx.beginPath();
        if (memeString.length > 0) {

            if (line.align === 'center') {
                gCtx.rect(
                    canvasWidth - lineWidth / 2,
                    canvasHeight - 0.5 * line.fontSize,
                    lineWidth,
                    lineHeight
                );
            } else if (line.align === 'end') {
                gCtx.rect(
                    canvasWidth - lineWidth,
                    canvasHeight - 0.5 * line.fontSize,
                    lineWidth,
                    lineHeight
                );
            } else if (line.align === 'start') {
                gCtx.rect(
                    canvasWidth,
                    canvasHeight - 0.5 * line.fontSize,
                    lineWidth,
                    lineHeight
                );
            }
        }

        gCtx.stroke();
    });
}

function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('meme/jpeg');
    elLink.href = imgContent;
    elLink.download = 'generatedMeme';
}

function onAddLine() {
    addLine();
    fillTextinCanvas(memeDetails, gCtx);
    updateMemeTextInput();
}

function onSetText(str) {
    setText(str);
    updateMemeTextInput();
    renderMeme();
}

function onSetFillColor(color) {
    setFillColor(color);
    renderMeme();
}

function onSetStrokeColor(color) {
    setStrokeColor(color);
    renderMeme();
}

function onChangeFontSize(num) {
    ChangeFontSize(num);
    renderMeme();
}

function onChangeFont(font) {
    changeFont(font);
    renderMeme();
}

function onDeleteText() {
    deleteText();
    renderMeme();
}

function onChangeAlignText(align) {
    changeAlignText(align);
    renderMeme();
}

function onSwitchBetweenLines() {
    switchbetweenLines();
    updateMemeTextInput();
    renderMeme();
}

function onUploadImg() {
    uploadImg();
}

function onSaveMeme() {
    saveMeme();
}

// function onSaveMeme() {
// const meme = getMeme()
//  saveMemetoStorage('memeDB', meme)
// }

function getFonts() {
    let elFontElement = document.querySelector('.select-font');
    let elFontOptionValues = [...elFontElement.options].map((o) => o.value);
    return elFontOptionValues;
}

