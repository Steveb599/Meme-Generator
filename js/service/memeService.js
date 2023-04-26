const gFaces = ['<i class="fa-light fa-face-awesome"></i>',
    '<i class="fa-solid fa-face-woozy"></i>',
    '<i class="fa-solid fa-face-worried"></i>',
    '<i class="fa-solid fa-face-smiling-hands"></i>',
    '<i class="fa-solid fa-face-zany"></i>',
    '<i class="fa-solid fa-face-tired"></i>',
    '<i class="fa-solid fa-face-sad-cry"></i>',
    '<i class="fa-solid fa-face-sleeping"></i>',
    '<i class="fa-solid fa-face-rolling-eyes"></i>',
    '<i class="fa-solid fa-face-monocle"></i>',
    '<i class="fa-solid fa-face-grin-tears"></i>',
    '<i class="fa-solid fa-face-hand-yawn"></i>',
    '<i class="fa-solid fa-face-angry-horns"></i>',
    '<i class="fa-solid fa-face-grin-beam-sweat"></i>',
    '<i class="fa-solid fa-face-head-bandage"></i>',
    '<i class="fa-solid fa-face-dizzy"></i>']

const STORAGE_KEY = 'memeDB'

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
var gMeme = {
    selectedImgId: null,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            fontSize: 20,
            font: 'arial',
            align: 'center',
            colorFill: 'red',
            colorStroke: 'black',
        },
        {
            txt: '',
            fontSize: 20,
            font: 'arial',
            align: 'center',
            colorFill: 'red',
            colorStroke: 'black',
        }
    ]
}


function getMeme() {
    return gMeme
}

function setText(str) {
    gMeme.lines[gMeme.selectedLineIdx].txt = str
}

function setImg(id) {
    gMeme.selectedImgId = id
    renderMeme()
}

function setFillColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].colorFill = color
}

function setStrokeColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].colorStroke = color
}

function ChangeFontSize(num) {
    gMeme.lines[gMeme.selectedLineIdx].fontSize += num
}

function changeFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font
}

function deleteText() {
    gMeme.lines[gMeme.selectedLineIdx].txt = ''
}

function changeAlignText(align) {
    gMeme.lines[gMeme.selectedLineIdx].align = align
}

function switchbetweenLines() {
    gMeme.selectedLineIdx = (!gMeme.selectedLineIdx) ? 1 : 0
}

// function saveMeme() {
//     saveMemetoStorage()
// }

