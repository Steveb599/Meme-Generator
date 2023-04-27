'use strict'

let images = getImgs()

function onInitGallery() {
    renderGallery()
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
    onShowGallery()
    renderMeme()
}

function onShowGallery() {
    const elMemeEditor = document.querySelector('.meme-editor')
    const elImageGallery = document.querySelector('.image-gallery')
    elMemeEditor.hidden = false
    elImageGallery.hidden = true
}

