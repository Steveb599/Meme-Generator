const gEmojis = [
    '😂',
    '😜',
    '🤔',
    '😊',
    '😎',
    '🙄',
    '😴',
    '😷',
    '🤯',
    '🚀',
    '🌈',
    '🦄',
    '🍕',
    '🍔',
    '🍩',
    '🍺',
];

const STORAGE_KEY = 'memeDB';

const memeStrings = [
    'What if I told you',
    'When you realise',
    'Coding is fun',
    'Did someone say',
    'Not sure if',
    'This is why you need',
    'One does not simply',
    'Haters gonna hate',
    'I am not saying it was',
    'You must be very proud',
    'I have a surprise for you',
    'You gotta be kidding me',
    'it doesnt work...why?',
    'it works...why?',
    'my program: *works perfectly*',
    'Not sure if I am a good programmer',
    'Stackoverflow for the win',
    'Me after 1 hour of coding',
    'Me: sends programming meme',
];
const canvas = document.querySelector('#my-canvas');
const gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 };
let gMeme = {
    selectedImgId: null,
    selectedLineIdx: 0,
    selectedEmojis: null,
    lines: [
        {
            txt: '',
            fontSize: 30,
            font: 'impact',
            align: 'center',
            colorFill: 'white',
            colorStroke: 'black',
            isDrag: false,
            pos: {
                x: canvas.width / 2,
                y: canvas.height / 8,
            },
        },
        {
            txt: '',
            fontSize: 30,
            font: 'impact',
            align: 'center',
            colorFill: 'white',
            colorStroke: 'black',
            isDrag: false,
            pos: {
                x: canvas.width / 2,
                y: canvas.height * 0.8,
            },
        },
    ],
};

function setLineDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}

// Move the circle in a delta, diff from the pervious pos
function moveLine(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].pos.x += dx
    gMeme.lines[gMeme.selectedLineIdx].pos.y += dy
}

function isLineClicked(clickedPos) {
    const pos = {
        x: gMeme.lines[gMeme.selectedLineIdx].pos.x,
        y: gMeme.lines[gMeme.selectedLineIdx].pos.x
    }
    // Calc the distance between two dots
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    // console.log('distance', distance)
    //If its smaller then the radius of the circle we are inside
    return distance
    // <= gCircle.size
}


function selectEmoji(emoji) {
    gMeme.selectedEmojis = emoji;
}

function getMeme() {
    return gMeme;
}

function setText(str) {
    gMeme.lines[gMeme.selectedLineIdx].txt = str;
}

function setImg(id) {
    gMeme.selectedImgId = id;
    renderMeme();
}

function setFillColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].colorFill = color;
}

function setStrokeColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].colorStroke = color;
}

function ChangeFontSize(num) {
    gMeme.lines[gMeme.selectedLineIdx].fontSize += num;
}

function changeFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font;
}

function deleteText() {
    gMeme.lines[gMeme.selectedLineIdx].txt = '';
    if (gMeme.selectedLineIdx > 0) [gMeme.selectedLineIdx--];
}

function changeAlignText(align) {
    gMeme.lines[gMeme.selectedLineIdx].align = align;
}

function switchbetweenLines() {
    gMeme.selectedLineIdx =
        gMeme.selectedLineIdx < gMeme.lines.length - 1
            ? (gMeme.selectedLineIdx += 1)
            : 0;
}

function addLine() {
    const line = {
        txt: '',
        fontSize: 20,
        font: 'arial',
        align: 'center',
        colorFill: 'red',
        colorStroke: 'black',
        isDrag: false,
        pos: {
            x: canvas.width / 2,
            y: canvas.height / 2,
        },
    };
    gMeme.lines.push(line);
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function generateRandomMeme() {
    const images = getImgs();
    const fonts = getFonts();
    const randomFont = fonts[getRandomIntInclusive(0, fonts.length - 1)];
    const randomImageId = getRandomIntInclusive(1, images.length);
    const randomString =
        memeStrings[getRandomIntInclusive(0, memeStrings.length - 1)];
    let secondRandomString;
    const randomStrokeClr = getRandomColor();
    const randomFillClr = getRandomColor();
    let randomFontSize = getRandomIntInclusive(2, 4) * 10;
    const numOfLines = getRandomIntInclusive(1, 2);
    if (numOfLines === 2) {
        secondRandomString =
            memeStrings[getRandomIntInclusive(0, memeStrings.length)];
        while (secondRandomString === randomString) {
            secondRandomString =
                memeStrings[getRandomIntInclusive(0, memeStrings.length)];
        }
        gMeme.lines[1].txt = secondRandomString;
    }
    gMeme.selectedImgId = randomImageId;
    gMeme.lines.forEach((line, idx) => {
        gMeme.selectedEmojis = null
        if (idx < numOfLines) {
            gMeme.selectedLineIdx = idx;
            line.txt = !idx ? randomString : secondRandomString;
            line.fontSize = randomFontSize;
            line.font = randomFont;
            line.align = 'center';
            line.colorFill = randomFillClr;
            line.colorStroke = randomStrokeClr;
        }
    });
}

function saveMeme() {
    const memes = loadFromStorage('memeDB') || [];
    memes.push(gMeme);
    saveToStorage('memeDB', memes);
}

function uploadImg() {
    const gElCanvas = document.querySelector('#my-canvas');
    const imgDataUrl = gElCanvas.toDataURL('meme/jpeg'); // Gets the canvas content as an image format

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        // Encode the instance of certain characters in the url
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl);
        console.log(encodedUploadedImgUrl);
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`,
        );
    }
    // Send the image to the server
    doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {
    // Pack the image for delivery
    const formData = new FormData();
    formData.append('img', imgDataUrl);

    // Send a post req with the image to the server
    const XHR = new XMLHttpRequest();
    XHR.onreadystatechange = () => {
        // If the request is not done, we have no business here yet, so return
        if (XHR.readyState !== XMLHttpRequest.DONE) return;
        // if the response is not ok, show an error
        if (XHR.status !== 200) return console.error('Error uploading image');
        const { responseText: url } = XHR;
        // Same as
        // const url = XHR.responseText

        // If the response is ok, call the onSuccess callback function,
        // that will create the link to facebook using the url we got
        console.log('Got back live url:', url);
        onSuccess(url);
    };
    XHR.onerror = (req, ev) => {
        console.error(
            'Error connecting to server with request:',
            req,
            '\nGot response data:',
            ev,
        );
    };
    XHR.open('POST', '//ca-upload.com/here/upload.php');
    XHR.send(formData);
}

function getEmojis() {
    return gEmojis;
}


function moveLine(dx, dy) {
    gCircle.pos.x += dx
    gCircle.pos.y += dy

}
