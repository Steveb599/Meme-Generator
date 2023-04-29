'use strict'

let images = getImgs()

var gLanguage = 'en'

function onInitGallery() {
    renderGallery()
    onShowGallery()
    onSetLang(gLanguage)
}




function onShowAbout() {
    const elMemeEditor = document.querySelector('.meme-editor');
    const elImageGallery = document.querySelector('.image-gallery');
    const elAboutSection = document.querySelector('.about-container');
    const elSavedMemes = document.querySelector('.saved-memes');
    elMemeEditor.classList.add('hidden');
    elImageGallery.classList.add('hidden');
    elAboutSection.classList.remove('hidden');
    elSavedMemes.classList.add('hidden');
    doTrans()
}

function onShowGallery() {
    const elMemeEditor = document.querySelector('.meme-editor');
    const elImageGallery = document.querySelector('.image-gallery');
    const elAboutSection = document.querySelector('.about-container');
    const elSavedMemes = document.querySelector('.saved-memes');
    elMemeEditor.classList.add('hidden');
    elImageGallery.classList.remove('hidden');
    elAboutSection.classList.add('hidden');
    elSavedMemes.classList.add('hidden');
    doTrans()
}

function onShowSavedMemes() {
    const elMemeEditor = document.querySelector('.meme-editor');
    const elImageGallery = document.querySelector('.image-gallery');
    const elAboutSection = document.querySelector('.about-container');
    const elSavedMemes = document.querySelector('.saved-memes');
    elMemeEditor.classList.add('hidden');
    elImageGallery.classList.add('hidden');
    elAboutSection.classList.add('hidden');
    elSavedMemes.classList.remove('hidden');
    doTrans()
}

function onShowMemeEditor() {
    const elMemeEditor = document.querySelector('.meme-editor');
    const elImageGallery = document.querySelector('.image-gallery');
    const elAboutSection = document.querySelector('.about-container');
    const elSavedMemes = document.querySelector('.saved-memes');
    elMemeEditor.classList.remove('hidden');
    elImageGallery.classList.add('hidden');
    elAboutSection.classList.add('hidden');
    elSavedMemes.classList.add('hidden');
    doTrans()
    onInit()
}

function renderGallery() {
    const container = document.querySelector('.image-container')
    let strHtmls = images.map(image => `${image.url}`)
    strHtmls = `<div class="custom-file-input"><label for="img" data-trans="upload-image">Upload an Image</label>
<input type="file" id="img" class="file-input" name="image" onchange="onImgInput(event)" style="display: none"></div>` + strHtmls.join('')
    container.innerHTML = strHtmls
}

function onImgSelect(id) {
    deleteAllText()
    setImg(id)
    onShowMemeEditor()
    renderMeme()
}

function renderImg(img) {
    changeImgId()
    renderMeme(img)
}

function onGenerateRandomMeme() {
    generateRandomMeme()
    clearCanvas()
    renderMeme()
    onShowMemeEditor()
}
