'use strict'


function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function saveMemestoStorage() {
    saveToStorage(STORAGE_KEY, gMeme)
}

function loadMemeFromStorage() {
    return loadFromStorage('memeDB')
}