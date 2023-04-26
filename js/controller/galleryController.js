'use strict'

let images = getImgs()

function onInitGallery() {
    renderGallery()
}


function renderGallery() {
    const container = document.querySelector('.image-container')
    let strHtmls = images.map(image => `${image.url}`)
    container.innerHTML = strHtmls.join('')
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