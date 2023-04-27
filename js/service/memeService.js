const gStickers = ['<i class="fa-light fa-face-awesome"></i>',
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

const memeStrings = ['What if I told you', 'When you realise', 'Coding is fun', 'Did someone say', 'Not sure if', 'This is why you need', 'One does not simply', 'Haters gonna hate', 'I am not saying it was', 'You must be very proud', 'I have a surprise for you', 'You gotta be kidding me', 'it doesnt work...why?', 'it works...why?', 'my program: *works perfectly*', 'Not sure if I am a good programmer', 'Stackoverflow for the win', 'Me after 1 hour of coding', 'Me: sends programming meme']

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
var gMeme = {
    selectedImgId: null,
    selectedLineIdx: 0,
    selectedStickerIdx: null,
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
        },
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
    gMeme.selectedLineIdx = (gMeme.selectedLineIdx < (gMeme.lines.length - 1)) ? gMeme.selectedLineIdx += 1 : 0
}

function addLine() {
    const line = {
        txt: '',
        fontSize: 20,
        font: 'arial',
        align: 'center',
        colorFill: 'red',
        colorStroke: 'black',
    }
    gMeme.lines.push(line)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function generateRandomMeme() {
    const images = getImgs()
    const fonts = getFonts()
    const randomFont = fonts[getRandomIntInclusive(0, fonts.length - 1)]
    const randomImageId = getRandomIntInclusive(1, images.length)
    const randomString = memeStrings[getRandomIntInclusive(0, memeStrings.length - 1)]
    let secondRandomString
    const randomStrokeClr = getRandomColor()
    const randomFillClr = getRandomColor()
    let randomFontSize = getRandomIntInclusive(2, 4) * 10
    const numOfLines = getRandomIntInclusive(1, 2)
    if (numOfLines === 2) {
        secondRandomString = memeStrings[getRandomIntInclusive(0, memeStrings.length)]
        while (secondRandomString === randomString) {
            secondRandomString = memeStrings[getRandomIntInclusive(0, memeStrings.length)]
        }
        gMeme.lines[1].txt = secondRandomString
    }
    gMeme.selectedImgId = randomImageId
    gMeme.lines.forEach((line, idx) => {
        if (idx < numOfLines) {
            gMeme.selectedLineIdx = idx
            line.txt = (!idx) ? randomString : secondRandomString
            line.fontSize = randomFontSize
            line.font = randomFont
            line.align = 'center'
            line.colorFill = randomFillClr
            line.colorStroke = randomStrokeClr
        }
    })
}

function saveMeme() {
    const memes = loadFromStorage('memeDB') || []
    memes.push(gMeme)
    saveToStorage('memeDB', memes)
}

function uploadImg() {
    const gElCanvas = document.querySelector('#my-canvas')
    const imgDataUrl = gElCanvas.toDataURL('meme/jpeg') // Gets the canvas content as an image format

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        // Encode the instance of certain characters in the url
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        console.log(encodedUploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
    }
    // Send the image to the server
    doUploadImg(imgDataUrl, onSuccess)
}

function doUploadImg(imgDataUrl, onSuccess) {
    // Pack the image for delivery
    const formData = new FormData()
    formData.append('img', imgDataUrl)

    // Send a post req with the image to the server
    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {
        // If the request is not done, we have no business here yet, so return
        if (XHR.readyState !== XMLHttpRequest.DONE) return
        // if the response is not ok, show an error
        if (XHR.status !== 200) return console.error('Error uploading image')
        const { responseText: url } = XHR
        // Same as
        // const url = XHR.responseText

        // If the response is ok, call the onSuccess callback function, 
        // that will create the link to facebook using the url we got
        console.log('Got back live url:', url)
        onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
        console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
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


function getStickers() {
    return gStickers
}