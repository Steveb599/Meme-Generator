'use strict'

let images = getImgs()

var gLanguage = 'en'

function onInitGallery() {
    renderGallery()
    onShowGallery()
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
}

function renderGallery() {
    const container = document.querySelector('.image-container')
    let strHtmls = images.map(image => `${image.url}`)
    strHtmls = `<div class="custom-file-input"><label for="img">Upload an Image</label>
<input type="file" id="img" class="file-input" name="image" onchange="onImgInput(event)" style="display: none"></div>` + strHtmls.join('')
    container.innerHTML = strHtmls
}

function onImgSelect(id) {
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
    renderMeme()
    onShowMemeEditor()
}


